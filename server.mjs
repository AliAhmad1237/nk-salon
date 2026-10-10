import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

export default function handler(req, res) {
  let reqPath = decodeURI((req.url || '/').split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const cleanPath = reqPath.startsWith('/') ? reqPath.slice(1) : reqPath;
  const filePath = path.resolve(process.cwd(), cleanPath);

  // Security check: ensure path stays within root directory
  if (!filePath.startsWith(process.cwd())) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    if (ext === '.css' || ext === '.js' || ext.match(/\.(jpg|jpeg|png|svg|webp|ico)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    fs.createReadStream(filePath).pipe(res);
  } else {
    const notFoundPath = path.resolve(process.cwd(), '404.html');
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (fs.existsSync(notFoundPath)) {
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.end('404 Not Found');
    }
  }
}

// Only listen when directly run from CLI: node server.mjs
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirectRun && !process.env.VERCEL) {
  const PORT = process.env.PORT || 8080;
  const server = http.createServer(handler);
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`NK Salon local server running at http://localhost:${PORT}/`);
  });
}
