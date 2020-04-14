const sql = require("mssql");
const root = require("app-root-path");
const dbDetails = require(`${root}/config/secret.js`);
const Q = require("q");

module.exports.connect = function() {
  var q = Q.defer();
  sql
    .connect(dbDetails)
    .then(function(err) {
      var req = new sql.Request();
      console.log("req>>>>>>>>>>>>>", req);
      q.resolve(req);
    })
    .catch(err => {
      console.log("err>>>>>>>>>>>>>>>>", err);
      q.reject();
    });
  return q.promise;
};
