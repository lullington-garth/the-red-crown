const XLSX = require("xlsx");
const fs = require("fs");

// ---------- CLEAN SMART QUOTES ----------
function cleanSmartQuotes(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/–/g, "-")
    .replace(/—/g, "-");
}

// ---------- PARSE GENERIC STAT STRING (SKILL +1, STAMINA -2 etc) ----------
function parseSingleStatExpression(expression) {
  if (!expression || expression === "None") return null;

  const match = expression.match(/^([A-Z]+)\s*([+-]?\d+)$/);
  if (!match) return null;

  return {
    stat: match[1],
    amount: parseInt(match[2], 10)
  };
}

// ---------- PARSE MULTI STAT MOD (MAGIC +1, SKILL -2 etc) ----------
function parseStatMod(statMod) {
  const stats = {};
  if (!statMod || statMod === "None") return stats;

  const mods = statMod.split(",").map(s => s.trim());

  mods.forEach(entry => {
    const parsed = parseSingleStatExpression(entry);
    if (parsed) {
      stats[parsed.stat] = parsed.amount;
    }
  });

  return stats;
}

// ---------- PARSE RISK EFFECT ----------
function parseRiskEffect(effect, description) {
  if (!effect || effect === "None") return null;

  if (effect === "MISFIRE") {
    return {
      type: "misfire",
      description
    };
  }

  if (effect === "BACKFIRE") {
    return {
      type: "backfire",
      description
    };
  }

  if (effect === "STUNNED") {
    return {
      type: "stunned",
      description
    };
  }

  const parsed = parseSingleStatExpression(effect);

  if (parsed) {
    return {
      type: "stat",
      stat: parsed.stat,
      amount: parsed.amount,
      description
    };
  }

  return {
    type: "unknown",
    raw: effect,
    description
  };
}

// ---------- FORCE NUMBER CONVERSION ----------
function toNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  return Number(value);
}

// ---------- LOAD EXCEL ----------
//const filePath = "C:\\Users\\DouglasHeather\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Spell Book JSON OTHER.xlsx";
const filePath = "C:\\Users\\lulli\\OneDrive - Steeldeck\\Documents\\FF For Martin & David\\Spell Book JSON 1.xlsx";

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

let data = XLSX.utils.sheet_to_json(sheet);

// ---------- TRANSFORM DATA ----------
data = data.map(row => {
  const cleaned = {};

  for (const key in row) {
    cleaned[key] = cleanSmartQuotes(row[key]);
  }

  return {
    id: cleaned["spell-id"],
    name: cleaned["spell-name"],
    type: cleaned["spell-type"],
    element: cleaned["element"],
    bookId: cleaned["book-id"],

    attack: {
      red: toNumber(cleaned["attack-str-red"]),
      yellow: toNumber(cleaned["attack-str-yellow"]),
      green: toNumber(cleaned["attack-str-green"]),
      blue: toNumber(cleaned["attack-str-blue"])
    },

    duration: {
      red: toNumber(cleaned["duration-red"]),
      yellow: toNumber(cleaned["duration-yellow"]),
      green: toNumber(cleaned["duration-green"]),
      blue: toNumber(cleaned["duration-blue"])
    },

    areaOfEffect: {
      red: toNumber(cleaned["area-of-effect-red"]),
      yellow: toNumber(cleaned["area-of-effect-yellow"]),
      green: toNumber(cleaned["area-of-effect-green"]),
      blue: toNumber(cleaned["area-of-effect-blue"])
    },

    riskMod: {
      red: toNumber(cleaned["risk-mod-red"]),
      yellow: toNumber(cleaned["risk-mod-yellow"]),
      green: toNumber(cleaned["risk-mod-green"]),
      blue: toNumber(cleaned["risk-mod-blue"])
    },

    risk: parseRiskEffect(
      cleaned["risk-effect"],
      cleaned["risk-desc"]
    ),

    statMod: parseStatMod(cleaned["stat-mod"]),

    enemyMod: parseSingleStatExpression(cleaned["enemy-mod"]),

    description: cleaned["description"]
  };
});

// ---------- SAVE JSON ----------
fs.writeFileSync("spells.json", JSON.stringify(data, null, 2));

console.log("✅ spells.json created successfully!");