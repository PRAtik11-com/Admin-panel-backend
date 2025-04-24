const express = require("express");
const logger = require("../middlewares/logger.middleware");
const auth = require("../middlewares/auth.middleware");
const { addHero, getHeroes, updateVillain, deleteHero } = require("../controllers/hero.controller");
const heroRouter = express.Router();



heroRouter.use(logger);

// Hero routes
heroRouter.post("/add/hero", auth, addHero);
heroRouter.get("/heroes", getHeroes);
heroRouter.patch("/update/villain/:hero_id", auth, updateVillain);
heroRouter.delete("/delete/hero/:hero_id", auth, deleteHero);

module.exports = heroRouter;
