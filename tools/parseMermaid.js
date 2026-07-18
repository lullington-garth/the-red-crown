// parseMermaid.js

const fs = require("fs");
const path = require("path");

// INPUT + OUTPUT PATHS
const inputFile = `C:\\Users\\DouglasHeather\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\FOD Maps\\Final Numbering\\Worm of Sligoff.html`;
const outputDir = `C:\\Users\\DouglasHeather\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Game Build\\nodes\\wormOfSligoff`;

//const inputFile = `C:\\Users\\lulli\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\FOD Maps\\Final Numbering\\Bone Golem.html`;
//const outputDir = `C:\\Users\\lulli\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Game Build\\nodes\\boneGolem`;

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// STEP 1: Read file
const html = fs.readFileSync(inputFile, "utf-8");

// STEP 2: Extract Mermaid block
const mermaidMatch = html.match(/<div class="mermaid">([\s\S]*?)<\/div>/);

if (!mermaidMatch) {
  console.error("No mermaid block found.");
  process.exit(1);
}

const mermaid = mermaidMatch[1];

// STEP 3: Parse nodes
const nodeRegex = /(\d+)\["([\s\S]*?)"\]/g;
const nodes = {};

let match;
while ((match = nodeRegex.exec(mermaid)) !== null) {
  const id = match[1];
  let content = match[2];

  // Remove leading ID line (e.g. "681\n")
  content = content.replace(/^\d+\\n/, "");

  // Convert escaped newlines
  content = content.replace(/\\n/g, "\n");

  nodes[id] = {
    id,
    content: content.trim(),
    choices: []
  };
}

// STEP 4: Parse edges
const edgeRegex = /(\d+)-->\|\s*(.*?)\s*\|\s*(\w+)/g;

while ((match = edgeRegex.exec(mermaid)) !== null) {
  const from = match[1];
  const text = match[2] || "";
  const to = match[3];

  if (!nodes[from]) continue;

  nodes[from].choices.push({
    text: text.trim(),
    to: to.trim()
  });
}

// STEP 5: Write markdown files
for (const id in nodes) {
  const node = nodes[id];

  const frontmatter = [
    "---",
    `id: ${node.id}`,
    "choices:",
    ...node.choices.map(c => `  - text: ${c.text}\n    to: ${c.to}`),
    "---"
  ].join("\n");

  const md = `${frontmatter}\n\n${node.content}\n`;

  const filePath = path.join(outputDir, `${id}.md`);
  fs.writeFileSync(filePath, md, "utf-8");
}

console.log("Done! Markdown files created.");