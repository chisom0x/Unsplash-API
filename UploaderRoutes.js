const express = require('express');
const router = express.Router();
const UploaderController = require('./UploaderController')

router
.route('/')
.get(UploaderController.getAllImages)
.post(UploaderController.uploadImage, UploaderController.uploadImagemsg)

router
.route('/:filename')
.get(UploaderController.getImage)
.delete(UploaderController.deleteImage)

module.exports = router;
