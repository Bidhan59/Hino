const express = require("express");
const root = require("app-root-path");
const bodyParser = require("body-parser");
const app = express();
const router = require(`${root}/routes.js`);
const devices = require(`${root}/controllers/devices.js`);
app.use(bodyParser.json({ limit: "100mb" }));
app.use("/", router);
app.listen(3000, function() {
  console.log("Server started on port: " + 3000);
});
