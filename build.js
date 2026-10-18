/**
 * Cloudflare Pages & Static Site Builder for Suraj Digital
 * Ensures seamless deployment regardless of build output settings:
 * Root (/), dist/, public/, or build/
 */

const fs = require('fs');
const path = require('path');

const targetDirs = ['dist', 'public'];

const rootFiles = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '.nojekyll',
  'CNAME',
  'README.md'
];

const rootFolders = [
  'css',
  'js',
  'assets'
];

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(source)) return;
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source);
  for (const item of items) {
    const srcPath = path.join(source, item);
    const destPath = path.join(target, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

for (const target of targetDirs) {
  const destDir = path.resolve(__dirname, target);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const file of rootFiles) {
    const src = path.resolve(__dirname, file);
    const dest = path.resolve(destDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  for (const folder of rootFolders) {
    const srcFolder = path.resolve(__dirname, folder);
    const destFolder = path.resolve(destDir, folder);
    copyFolderRecursive(srcFolder, destFolder);
  }
}

console.log('✓ Build successful: Static output prepared for Cloudflare Pages (dist, public, and root).');
