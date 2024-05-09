// handle CRUD Gallery

const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

const getGallery = async (res, req) => {};
const getImg = async (res, req) => {};
const createImg = async (res, req) => {};
const getImgById = async (res, req) => {};
const updateImgById = async (res, req) => {};
const deleteImgById = async (res, req) => {};

const getTextToPost = async (res, req) => {};
const createTextToPost = async (res, req) => {};
const getTextToPostById = async (res, req) => {};
const updateTextToPostById = async (res, req) => {};
const deleteTextById = async (res, req) => {};

router.get("/", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM gallery");
    res.json(rows);
  } catch (error) {
    console.error("Something went wrong fetching gallery", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/gallery", getGallery);

router.get("/gallery/img", getImg);
router.post("/gallery/img", createImg);
router.get("/gallery/img/:id", getImgById);
router.put("/gallery/img:id", updateImgById);
router.delete("/gallery/img/:id", deleteImgById);

router.get("/gallery/text", getTextToPost);
router.post("/gallery/text", createTextToPost);
router.get("/gallery/text/:id", getTextToPostById);
router.put("/gallery/text/:id", updateTextToPostById);
router.delete("/gallery/text/:id", deleteTextById);

module.exports = router;
