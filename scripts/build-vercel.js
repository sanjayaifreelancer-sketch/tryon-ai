const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const cssOut = path.join(distDir, "tailwind.css");

// Generate Tailwind CSS
console.log("Generating Tailwind CSS...");
execSync(`npx tailwindcss -i "${path.join(rootDir, 'global.css')}" -o "${cssOut}"`, {
  cwd: rootDir,
  stdio: "inherit",
});

// Inject CSS link into index.html
const htmlPath = path.join(distDir, "index.html");
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, "utf-8");
  html = html.replace(
    "</head>",
    '  <link rel="stylesheet" href="/tailwind.css" />\n  </head>'
  );
  fs.writeFileSync(htmlPath, html);
  console.log("Tailwind CSS injected into build");
} else {
  console.error("index.html not found in dist");
  process.exit(1);
}
