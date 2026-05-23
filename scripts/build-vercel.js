const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
const appDir = path.join(distDir, "app");

// Clean from previous builds
if (fs.existsSync(appDir)) {
  fs.rmSync(appDir, { recursive: true, force: true });
}

if (fs.existsSync(distDir)) {
  const entries = fs.readdirSync(distDir);
  const appIndex = path.join(distDir, "index.html");

  // Move all Expo export files into /app subdirectory
  fs.mkdirSync(appDir, { recursive: true });

  for (const file of entries) {
    if (file === "app") continue;
    const src = path.join(distDir, file);
    const dest = path.join(appDir, file);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
    }
  }
}

// Copy landing page to root
if (fs.existsSync(publicDir)) {
  const landingFiles = fs.readdirSync(publicDir);
  for (const file of landingFiles) {
    const src = path.join(publicDir, file);
    const dest = path.join(distDir, file);
    fs.copyFileSync(src, dest);
  }
}

console.log("Vercel build prepared: landing page at /, app at /app, API at /api");
