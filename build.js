const fs = require('fs');
const path = require('path');

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

function buildTarget(targetDir) {
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

['public', 'dist', 'build'].forEach(buildTarget);
console.log('Build completed: synchronized public/, dist/, and build/ directories.');
