var express = require("express");
var app = express();
var port = 8081;
const { platform } = require("os");
const { exec } = require("child_process");
var opn = require("opn");

var bodyParser = require("body-parser");
var bmParser = require("bookmark-parser");
var wn = require("window");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var URL = require("url").URL;
let command;

app.get("/start", (req, res) => {
  if (req.body["browser"] == "chrome") {
    opn(req.body["url"]);

    res.sendStatus(200);
  } else if (req.body["browser"] == "firefox") {
    opn(req.body["url"], { app: "firefox" });
    // exec(command);

    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});
app.get("/stop", (req, res) => {
  if (req.body["browser"] == "chrome") {
    command = "killall 'Google Chrome'";
    exec(command);
    res.sendStatus(200);
  } else if (req.body["browser"] == "firefox") {
    // exec(command);
    command = "kill -9 $(ps -x | grep firefox)";
    exec(command);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});
app.get("/cleanup", (req, res) => {
  if (req.body["browser"] == "chrome") {
    command = "rm -rf ~/.cache/google-chrome/Default/Cache";
    exec(command);
    command = "rm -rf ~/.cache/google-chrome/Default/";
    exec(command);
    command = "rm -rf ~/.config/google-chrome/";
    exec(command);
    command = "rm -rf ~/.config/google-chrome/Default";
    exec(command);
    res.sendStatus(200);
  } else if (req.body["browser"] == "firefox") {
    // exec(command);
    command = "rm -rf ~/.cache/mozilla/";
    exec(command);
    command = "rm -rf ~/.mozilla/";
    exec(command);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});
app.get("/geturl", (req, res) => {
  if (req.body["browser"] == "chrome") {
    let url = wn.location.href;
    console.log(url);
    res.sendStatus(200);
  } else if (req.body["browser"] == "firefox") {
    let url = wn.location.href;
    console.log(url);
    // exec(command);
    // bmParser
    //   .readFromJSONLZ4File(
    //     "~/.mozilla/firefox/iq8hatig.default/sessionstore-backups/recovery.jsonlz4"
    //   )
    //   .then((result) => {
    //     console.log(result.windows);
    //   })
    //   .catch((err) => {
    //     res.send(err);
    //   });
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
