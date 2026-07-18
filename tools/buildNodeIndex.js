const fs = require("fs");
const path = require("path");

// ROOT FOLDER THAT CONTAINS ALL NODE GROUPS
//const nodesRoot = `C:\\Users\\DouglasHeather\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Game Build\\nodes`;
const nodesRoot = `C:\\Users\\lulli\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Game Build\\nodes`;
// OUTPUT FOLDER (NEW)
//const outputDir = `C:\\Users\\DouglasHeather\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Game Build\\tools`;
const outputDir = `C:\\Users\\lulli\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Game Build\\tools`;

// OUTPUT FILE
const outputFile = path.join(outputDir, "nodeIndex.json");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Recursively walk folders
function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else if (file.endsWith(".md")) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

// Get all markdown files
const mdFiles = walk(nodesRoot);

// Build index
const index = {};

for (const filePath of mdFiles) {
  const fileName = path.basename(filePath); // e.g. 680.md
  const nodeId = path.parse(fileName).name; // e.g. 680

  // Relative path from nodesRoot
  const relativePath = path
    .relative(nodesRoot, filePath)
    .replace(/\\/g, "/");

  index[nodeId] = relativePath;
}

// Write JSON file into tools folder
fs.writeFileSync(outputFile, JSON.stringify(index, null, 2), "utf-8");

console.log(`Index built: ${Object.keys(index).length} nodes`);
console.log(`Saved to: ${outputFile}`);