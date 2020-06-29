const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length === 0) cb(new Error("Not found"));
      // cb(null, result[0].name);
      // cb(null, result[0].Population);
      cb(result);
    }
  );
}
// An example of an sql injection, where after the semicolon I wrote show tables, or any other command given that mutiple statemnets are allowed. I don't know what in the provided function result[0].name is supposed to show.
conn.connect();
getPopulation("country", "' OR 1=1; show tables;", "", (results) => {
  console.log(results);
});

// Revised function
function getPopulationInjectionProtected(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
    [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length === 0) cb(new Error("Not found"));
      // cb(null, result[0].name);
      // cb(null, result[0].Population);
      cb(result);
    }
  );
}
// The revised function leads to an error "Not Found"
getPopulationInjectionProtected(
  "country",
  "' OR 1=1; show tables;",
  "BEL",
  (results) => {
    console.log(results);
  }
);
conn.end();
