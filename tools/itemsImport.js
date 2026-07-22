const XLSX = require("xlsx");
const fs = require("fs");

// Function to parse stat-mod and stat-mod-type into an object
function parseStatMod(statMod) {
  const stats = {};
  if (!statMod) return stats;

  const mods = statMod.split(",").map(s => s.trim());

  mods.forEach(entry => {
    // Match:
    // STAT
    // STAT (B)
    // STAT (T)
    // Followed by + or - number
    const match = entry.match(/^([A-Z]+)(?:\s*\(([^)]+)\))?\s*([+-]?\d+)$/);

    if (match) {
      const statName = match[1];
      const suffix = match[2]; // B or T (optional)
      const modValue = parseInt(match[3], 10);

      const key = suffix ? `${statName} (${suffix})` : statName;

      stats[key] = modValue;
    }
  });

  return stats;
}

// Function to replace smart quotes with plain ASCII
function cleanSmartQuotes(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/[‘’]/g, "'") // single quotes
    .replace(/[“”]/g, '"') // double quotes
    .replace(/–/g, "-")   // en dash
    .replace(/—/g, "-");  // em dash
}

// Load Excel file
const filePath = "C:\\Users\\DouglasHeather\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Items JSON.xlsx";
//const filePath = "C:\\Users\\lulli\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Items JSON.xlsx";
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
let data = XLSX.utils.sheet_to_json(sheet);

// Map stat-mod into object and clean smart quotes
data = data.map(item => {
  const cleanedItem = {};

  for (const key in item) {
    cleanedItem[key] = cleanSmartQuotes(item[key]);
  }

  // ✅ Parse bonus-against (supports comma-separated values)
  const bonusAgainst = cleanedItem["bonus-against"] && cleanedItem["bonus-against"] !== "None"
    ? cleanedItem["bonus-against"]
        .split(",")
        .map(v => v.trim().toLowerCase())
    : [];

  // ✅ Parse bonus-mod (number, default 1 = no bonus)
  const bonusMod = cleanedItem["bonus-mod"] && cleanedItem["bonus-mod"] !== "None"
    ? Number(cleanedItem["bonus-mod"])
    : 1;

  return {
    ...cleanedItem,

    "stat-mod-object": parseStatMod(cleanedItem["stat-mod"]),

    // ✅ NEW structured bonus object
    effectiveness: bonusAgainst.length > 0
      ? {
          bonus_vs: bonusAgainst,
          attack_bonus: bonusMod
        }
      : null
  };
});

// Save JSON
fs.writeFileSync("items.json", JSON.stringify(data, null, 2));
console.log("JSON file created with stat-mod objects and cleaned smart quotes!");