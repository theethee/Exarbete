// handle CRUD blog

const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

// router.get("/", async (req, res) => {
//   try {
//     const { rows } = await client.query("SELECT * FROM blog");
//     console.log("Hämtar alla blogginlägg");

//     res.json(rows);
//   } catch (error) {
//     console.error("Something went wrong fetching blog", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const { rows } = await client.query(`
    SELECT blog.id, blog.blogheadline, blog.blogtext, media.file_path
    FROM blog
    LEFT JOIN media ON blog.media_id = media.id
    `);
    console.log("Hämtar alla blogginlägg");

    res.json(rows);
  } catch (error) {
    console.error("Something went wrong fetching blog", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log("Request body i blog backend: ", req.body);

    const { blogheadline, blogtext ,mediaId} = req.body; // tar emot från frontend

    // const mediaId = req.body.mediaId;

    // const mediaId = req.file ? req.file.filename : null; // tar emot media från fil om den inte är null

    console.log("GRATTIS du har postat en blogg");

    const result = await client.query(
      `INSERT INTO blog (blogheadline, blogtext, media_id) VALUES ($1, $2, $3) RETURNING *;`,
      [blogheadline, blogtext, mediaId]
    );

    res
      .status(201)
      .json({ message: "blog post created successfully", data: result.rows });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("SELECT * FROM blog WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "blog post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error gick inte att hämta blogginlägget", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { blogHeadline, blogtext, mediaId } = req.body;

    const result = await client.query(
      "UPDATE blog SET blogheadline = $1, blogtext = $2, media_id = $3 WHERE id = $4 RETURNING *;",
      [blogheadline, blogtext, mediaId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "blog post not found" });
    }

    res.json({
      message: "Grattis bloggen är uppdaterad!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error gick inte att uppdatera blogginlägget", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("DELETE FROM blog WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "blog post not found" });
    }

    res.json({ message: "Blogginlägget är nu raderat" });
  } catch (error) {
    console.error("Error gick inte att radera blogginlägget", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.post("/blog", createBlog);
// router.get("/blog/:id", getBlogById);
// router.put("/blog/:id", updateBlogById);
// router.delete("/blog:id", deleteBlog);

module.exports = router;
