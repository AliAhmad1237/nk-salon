import fs from 'node:fs';
import path from 'node:path';

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function syncStaticTo(targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  const rootFiles = ['index.html', '404.html'];
  for (const file of rootFiles) {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(targetDir, file));
    }
  }

  const assetDirs = ['css', 'js', 'assets'];
  for (const dir of assetDirs) {
    copyDir(dir, path.join(targetDir, dir));
  }
}

// 1. Sync standard target folders
['public', 'dist', 'build'].forEach(syncStaticTo);

// 2. Sync Vercel Build Output API v3
const vercelStatic = path.join('.vercel', 'output', 'static');
syncStaticTo(vercelStatic);

const vercelConfig = {
  version: 3,
  routes: [
    {
      src: '/assets/(.*)',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      continue: true
    },
    {
      src: '/css/(.*)',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      continue: true
    },
    {
      src: '/js/(.*)',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      continue: true
    },
    { handle: 'filesystem' },
    {
      src: '/_vercel/(.*)',
      dest: '/_vercel/$1'
    },
    { src: '/(.*)', dest: '/index.html' }
  ]
};

fs.writeFileSync(
  path.join('.vercel', 'output', 'config.json'),
  JSON.stringify(vercelConfig, null, 2)
);

console.log('Build completed: synchronized public, dist, build, and .vercel/output.');
