// handle CRUD Gallery

const express = require('express');
const router = express.Router();

router.get('/gallery/img', getImg);
router.post('/gallery/img', createImg);
router.get('/gallery/img/:id', getImgById);
router.put('/gallery/img:id', updateImgById);
router.delete('/gallery/img/:id', deleteImgById);

router.get('/gallery/text', getTextToPost);
router.post('/gallery/text', createTextToPost);
router.get('/gallery/text/:id', getTextToPostById);
router.put('/gallery/text/:id', updateTextToPostById);
router.delete('/gallery/text/:id', deleteTextById);


module.exports = router;
