const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

// to read DB
const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

// to write DB
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


const addHero = (req, res) => {
    const { role, password, ...heroData } = req.body;
  
    const db = readDB();
    db.heroes.push(heroData); // Only push hero data, not role/password
    writeDB(db);
    res.status(201).json(db.heroes);
  };
  


const getHeroes = (req, res) => {
  try {
    const db = readDB();
    res.status(200).json(db.heroes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching heroes", error: err.message });
  }
};


const updateVillain = (req, res) => {
  try {
    const heroId = Number(req.params.hero_id);
    const { name, health } = req.body;

    const db = readDB();
    const hero = db.heroes.find((hero) => hero.id === heroId);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    hero.villains.push({ name, health });
    writeDB(db);
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ message: "Error updating villain", error: err.message });
  }
};


const deleteHero = (req, res) => {
  try {
    const heroId = Number(req.params.hero_id);
    const db = readDB();

    const index = db.heroes.findIndex((hero) => hero.id === heroId);
    if (index === -1) {
      return res.status(404).json({ message: "Hero not found" });
    }

    db.heroes.splice(index, 1);
    writeDB(db);
    res.status(200).json(db.heroes);
  } catch (err) {
    res.status(500).json({ message: "Error deleting hero", error: err.message });
  }
};


module.exports = {
  addHero,
  getHeroes,
  updateVillain,
  deleteHero,
};
