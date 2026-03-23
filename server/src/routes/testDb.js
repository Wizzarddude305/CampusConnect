const express = require("express");
const router = express.Router();
const pool = require("../db/index.js");

router.get("/", async (req, res) => {
  try {
    console.log("DB URL:", process.env.DATABASE_URL);
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

module.exports = router;
