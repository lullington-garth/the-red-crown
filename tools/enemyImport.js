const XLSX = require("xlsx");
const fs = require("fs");

// Function to replace smart quotes with plain ASCII
function cleanSmartQuotes(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/–/g, "-")
    .replace(/—/g, "-");
}

// Convert Yes/No to boolean
function yesNoToBool(value) {
  if (typeof value !== "string") return value;
  return value.toLowerCase() === "yes";
}

// Load Excel file (same folder)
//const filePath = "C:\\Users\\DouglasHeather\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Enemy JSON.xlsx";
const filePath = "C:\\Users\\lulli\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Enemy JSON.xlsx";
const workbook = XLSX.readFile(filePath);

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
let data = XLSX.utils.sheet_to_json(sheet);

// Clean smart quotes
data = data.map(row => {
  const cleaned = {};
  for (const key in row) {
    cleaned[key] = cleanSmartQuotes(row[key]);
  }
  return cleaned;
});

// Convert into structured enemy JSON
const enemies = data.map(row => ({
  id: String(row.id).padStart(3, "0"),
  name: row.name,

  type: row.type ? String(row.type).toLowerCase() : null,

  stats: {
    skill: Number(row.skill),
    stamina: Number(row.stamina)
  },

  combat: {
    attack: Number(row["attack-str"]),
    magic: Number(row["magic-str"]),
    defence: Number(row["attack-res"]),
    magic_res: Number(row["magic-res"]),
    attack_type: row["attack-type"],
    dice: row["dice"],
    group: yesNoToBool(row["group-attack"]),
    weak: row["weak"],
    weak_mod: Number(row["weak-mod"]),
    immune: row["immune"],
    immune_mod: Number(row["immune-mod"])
  },

  special: {
    attack: row["sp-attack"] === "None" ? null : row["sp-attack"]
  },

  encounter: {
    found: Number(row["node-found"])
  }
}));

// Save JSON
fs.writeFileSync("enemies.json", JSON.stringify(enemies, null, 2));

console.log("Enemies JSON file created successfully!");