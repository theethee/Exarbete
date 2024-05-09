// handle CRUD blog

const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

const createBlog = async (req, res) => {};
const getBlogById = async (req, res) => {};
const updateBlogById = async (req, res) => {};
const deleteBlog = async (req, res) => {};

router.get("/", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM blog");
    res.json(rows);
  } catch (error) {
    console.error("Something went wrong fetching blog", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/blog", createBlog);
router.get("/blog/:id", getBlogById);
router.put("/blog/:id", updateBlogById);
router.delete("/blog:id", deleteBlog);

module.exports = router;

// const createBlogInputText = async(req, res) =>{}
// const getBlogTextById = async(req, res) =>{}
// const updateBlogTextById = async(req, res) =>{}
// const deleteBlogTextById = async(req, res) =>{}

// const getBlogImg = async(req, res) =>{}
// const createBlogImg = async(req, res) =>{}
// const getBlogImgById = async(req, res) =>{}
// const updateBlogImgById = async(req, res) =>{}
// const deleteBlogImgById = async(req, res) =>{}

// const getBlogVideo = async(req, res) =>{}
// const createBlogVideo = async(req, res) =>{}
// const getBlogVideoById = async(req, res) =>{}
// const updateBlogVideoById = async(req, res) =>{}
// const deleteBlogVideoById = async(req, res) =>{}

// router.get("/blog/text", getBlogInputText);
//  router.post('/blog/text', createBlogInputText);
// router.get('/blog/text/:id', getBlogTextById);
// router.put('/blog/text/:id', updateBlogTextById);
// router.delete('/blog/text/:id', deleteBlogTextById);

// router.get('/blog/img', getBlogImg);
// router.post('/blog/img', createBlogImg);
// router.get('/blog/img/:id', getBlogImgById);
// router.put('/blog/img/:id', updateBlogImgById);
// router.delete('/blog/img/:id', deleteBlogImgById);

// router.get('/blog/video', getBlogVideo);
// router.post('/blog/video', createBlogVideo);
// router.get('/blog/video/:id', getBlogVideoById);
// router.put('/blog/video/:id', updateBlogVideoById);
// router.delete('/blog/video/:id', deleteBlogVideoById);
