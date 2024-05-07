// handle CRUD blog

const express = require('express');
const router = express.Router();

router.get('/blog/text', getBlogInputText);
router.post('/blog/text', createBlogInputText);
router.get('/blog/text/:id', getBlogTextById);
router.put('/blog/text/:id', updateBlogTextById);
router.delete('/blog/text/:id', deleteBlogTextById);

router.get('/blog/img', getBlogImg);
router.post('/blog/img', createBlogImg);
router.get('/blog/img/:id', getBlogImgById);
router.put('/blog/img/:id', updateBlogImgById);
router.delete('/blog/img/:id', deleteBlogImgById);

router.get('/blog/video', getBlogVideo);
router.post('/blog/video', createBlogVideo);
router.get('/blog/video/:id', getBlogVideoById);
router.put('/blog/video/:id', updateBlogVideoById);
router.delete('/blog/video/:id', deleteBlogVideoById);

module.exports = router;
