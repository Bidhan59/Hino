const sql = require("mssql");
const Q = require("q");
const root = require("app-root-path");
const db = require(`${root}/config/db`);
const dbDetails = require(`${root}/config/secret.js`);
const jsonSQL = require("json-sql")();
var SQLGenerator = require("sql-json-generator");
module.exports.getDevices = function() {
  var q = Q.defer();
  sql
    .connect(dbDetails)
    .then(function(config, err) {
      if (err) console.log("err>>>>>>>>>>>", err);
      var sqlQuery = "SELECT * FROM Devices";
      var req = new sql.Request();
      req.query(sqlQuery).then((result, err) => {
        if (err) console.log(err);
        else {
          q.resolve(result.recordset);
        }
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
  sql
    .connect(dbDetails)
    .then(function(config, err) {
      if (err) console.log("err>>>>>>>>>>>", err);
      console.log("database connected");
      var req = new sql.Request();
      var query = queryFormat(data);
      req.query(query).then((result, err) => {
        if (err) console.log(err);
        else {
          q.resolve("Data Inserted");
        }
        sql.close();
      });
    })
    .catch(err => {
      q.reject();
    });
  return q.promise;
};

function queryFormat(data) {
  var values =
    "(" +
    data.id +
    "," +
    "'" +
    data.name +
    "'" +
    "," +
    "'" +
    data.Device_Details +
    "'" +
    ")";
  var query = "INSERT INTO Devices (id, name, Device_Details) VALUES " + values;
  return query;
}
