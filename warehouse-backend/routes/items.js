const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const DB_PATH = path.join(process.cwd(), "data", "db.json");
function ensureDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = { items: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
  }
}

function readDB() {
  ensureDB();
  const file = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(file);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.items);
});

router.post("/", (req, res) => {
  const { name, quantity, location, category } = req.body;

  if (!name || !quantity || !location)
    return res.status(400).json({ error: "Missing required fields." });

  const db = readDB();

  const newItem = {
    id: Date.now(),
    name,
    quantity: Number(quantity),
    location,
    category: category || "General"
  };

  db.items.push(newItem);
  writeDB(db);

  res.json(newItem);
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();

  const index = db.items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  db.items[index] = { ...db.items[index], ...req.body };
  writeDB(db);

  res.json(db.items[index]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();

  db.items = db.items.filter(i => i.id !== id);
  writeDB(db);

  res.json({ success: true });
});

module.exports = router;
