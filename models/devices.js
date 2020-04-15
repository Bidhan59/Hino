const sql = require("mssql");
const Q = require("q");
const root = require("app-root-path");
const db = require(`${root}/config/db`);
const dbDetails = require(`${root}/config/secret.js`);
const jsonSQL = require("json-sql")();
module.exports.getDevices = function() {
  var q = Q.defer();
  sql
    .connect(dbDetails)
    .then(function(config, err) {
      if (err) console.log("err>>>>>>>>>>>", err);
      var sqlQuery = "SELECT * FROM Devices";
      var req = new sql.Request();
      req.query(sqlQuery).then(recordset => {
        console.log("came here");
        if (err) console.log(err);
        else console.log("recordset>>>>>>>>>>>>>", recordset);
        q.resolve(recordset);
        sql.close();
      });
    })
    .catch(err => {
      q.reject();
    });
  return q.promise;
};

module.exports.postDevices = function(data) {
  var q = Q.defer();
  var sqlQ = jsonSQL.build({
    type: "insert",
    table: "Devices",
    values: data
  });
  sql
    .connect(dbDetails)
    .then(function(config, err) {
      if (err) console.log("err>>>>>>>>>>>", err);
      console.log("database connected");
      var req = new sql.Request();
      req.query(sqlQ).then(recordset => {
        console.log("came here");
        if (err) console.log(err);
        else console.log("recordset>>>>>>>>>>>>>", recordset);

        q.resolve(recordset);
        sql.close();
      });
    })
    .catch(err => {
      q.reject();
    });
  return q.promise;
};
