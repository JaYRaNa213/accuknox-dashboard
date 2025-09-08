const fs = require("fs");
const path = require("path");

const IGNORE = ["node_modules", ".git", "dist", ".vite"]; // add more if needed

function generateTree(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !IGNORE.includes(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  let result = "";

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    result += prefix + connector + entry.name + "\n";

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      result += generateTree(path.join(dir, entry.name), newPrefix);
    }
  });

  return result;
}

const startDir = process.cwd(); // current folder
const output = path.join(startDir, "tree.txt");

const tree = generateTree(startDir);
fs.writeFileSync(output, path.basename(startDir) + "\n" + tree);

console.log(`Project tree written to ${output}`);
