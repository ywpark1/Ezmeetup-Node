"use strict";

const router = require("express").Router();
const { authJwt } = require("../middleware/auth");

const fs = require("fs");
const path = require("path");
const showdown = require("showdown");
const converter = new showdown.Converter();

var text = fs.readFileSync(path.resolve(__dirname, "../README.md")).toString();
var html = converter.makeHtml(text);

router.get("/", (req, res) => {
  //   res.send("This is PRJ666 EzMeetup Frontpage.");
  res.send("Chat server is running");
//   res.send(html);
});

// router.get('/hello', authJwt, (req, res) => {
//     res.send('This is a private route!!!!');
// });

// router.get('/:version', (req, res) => {
//     res.send('This is PRJ666 EzMeetup API version ' + req.params.version + '!');
//     // res.render('index', { title: 'My Express App', message: 'Hello' });
// });

module.exports = router;
