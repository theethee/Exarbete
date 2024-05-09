// handle sign in

const express = require('express');
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

const login = async(req, res) =>{}

router.get("/", async(req, res) =>{
  try {
    const { rows } = await client.query("SELECT * FROM admin");
    res.json(rows);
  } catch (error) {
    console.error("Something went wrong fetching admin", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post('/login', login);

module.exports = router;
