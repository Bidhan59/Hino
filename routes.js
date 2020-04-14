const routes = require("express").Router();
const root = require("app-root-path");
const devices = require(`${root}/controllers/devices.js`);
routes.get("/getDevices", devices.fetchDevices);
routes.post("/postDevices", devices.createDevices);
routes.get("/serviceTest", function(req, res) {
  res.send("Services are working in docker");
});
module.exports = routes;
