const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const publicDir = path.join(__dirname, "..", "public");
const appDir = path.join(distDir, "app");

// Move Expo web export to /app subdirectory
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  fs.mkdirSync(appDir, { recursive: true });

  for (const file of files) {
    if (file === "app") continue;
    const src = path.join(distDir, file);
    const dest = path.join(appDir, file);
    fs.renameSync(src, dest);
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
