const express = require('express');
const router = require('./UploaderRoutes')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/uploader', router);


module.exports = app;
