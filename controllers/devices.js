const sql = require("mssql");
const root = require("app-root-path");
const deviceModel = require(`${root}/models/devices`);
const dbDetails = require(`${root}/config/secret.js`);
module.exports.fetchDevices = function(req, res, next) {
  console.log("came to fetchDevices in controller");
  deviceModel.getDevices().then(data => {
    console.log("data from the db", data);
    res.send(data);
  });
};

module.exports.createDevices = function(req, res, next) {
  deviceModel.postDevices(req.body).then(data => {
    console.log("data inserted in db", data);
    res.send(data);
  });
};
