import fs from 'fs';
import path from 'path';

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

function buildDirectory(targetDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
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
  console.log(`Successfully synced static files into ${targetDir}/`);
}

// Populate both public/ and dist/ so Vercel succeeds regardless of configured output directory
buildDirectory('public');
buildDirectory('dist');
console.log('Build complete.');
