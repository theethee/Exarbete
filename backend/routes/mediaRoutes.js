const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const multer = require("multer");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    // replace name if the file has same name?
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Request body i media backend: ", req.body);

    console.log("headline i media backend: ", req.body.blogheadline);
    console.log("blogtext i media backend: ", req.body.blogtext);
    console.log("file i media backend: ", req.body.mediaId);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { mimetype, path } = req.file;
    const { blogheadline, blogtext } = req.body;

    const mediaResult = await client.query(
      `INSERT INTO media (type, file_path) VALUES ($1, $2) RETURNING id`,
      [mimetype, path]
    );

    // console.log("Media result backend", mediaResult);
    const mediaId = mediaResult.rows[0].id;

    const blogResult = await client.query(
      `INSERT INTO blog (blogheadline, blogtext, media_id) VALUES ($1, $2, $3) RETURNING *`,
      [blogheadline, blogtext, mediaId]
    );
    // console.log("Blog result backend", blogResult);

    res.status(201).json({
      message: "Blog post created successfully",
      data: blogResult.rows,
    });
  } catch (error) {
    console.error("Something went wrong uploading media", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM media");
    console.log("Hämtar all media");

    res.json(rows);
  } catch (error) {
    console.error("Something went wrong fetching media", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
