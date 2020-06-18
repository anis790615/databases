const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});
// I tried to use functions that would creat tables and insert variables from objects, as opposed to enter the values in each query. Therefore, I chose not to specify to many parameters for table attributes, other than dta types.
const tables = {
  Invitee: [
    "invitee_no INT",
    "invitee_name VARCHAR(50)",
    "invited_by VARCHAR(50)",
  ],
  Room: ["room_no INT", "room_name VARCHAR(50)", "floor_no INT"],
  Meeting: [
    "meeting_no INT",
    "meeting_title VARCHAR(50)",
    "starting_time DATETIME",
    "ending_time DATETIME",
    "room_no INT",
  ],
};
const values = {
  Invitee: [
    [1, "Anis Alkomem", "Geralt of Rivia"],
    [2, "Louis CK", "Bill Burr"],
    [3, "Dua Lipa", "Cardi B"],
    [4, "Jack Sparrow", "Roy Jones"],
    [5, "Habib Numrmagomedov", "Tony Ferguson"],
  ],
  Room: [
    [1, "White Room", 1],
    [2, "Green Room", 3],
    [3, "Black Room", 6],
    [4, "Yellow Room", 8],
    [5, "Blue Room", 4],
  ],
  Meeting: [
    [12, "Accounting", "12:00", "13:00", 1],
    [15, "Marketing", "08:40", "10:00", 2],
    [22, "Strategy", "10:00", "11:00", 4],
    [44, "R&D", "14:00", "15:00", 3],
    [55, "Strategy", "16:00", "18:00", 5],
  ],
};
function createAndUseDb(dbName) {
  connection.query(
    `DROP DATABASE IF EXISTS ${dbName}; CREATE DATABASE ${dbName}; USE ${dbName};`,
    (error, results, fields) => {
      if (error) throw error;
      console.log(`DataBase ${dbName} is created`);
    }
  );
}
function createTables(TableObj) {
  const tableNames = Object.keys(TableObj);
  let tableQuery = "";
  tableNames.forEach((tableName) => {
    const tableAttributes = `(${TableObj[tableName].join(", ")})`;
    tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} ${tableAttributes};`;
    connection.query(tableQuery, (error, results, fields) => {
      if (error) throw error;
      console.log(`Table ${tableName} is created`);
    });
  });
}
function insertValues(ValuesObj) {
  const tableNames = Object.keys(ValuesObj);
  let valuesQuery = "";
  tableNames.forEach((tableName) => {
    const row = ValuesObj[tableName];
    row.forEach((value) => {
      const rowValues = value
        .map((item) => (typeof item !== "number" ? `"${item}"` : item))
        .join(",");

      valuesQuery = `INSERT INTO ${tableName} VALUES (${rowValues});`;

      connection.query(valuesQuery, (error, results, fields) => {
        if (error) throw error;
        console.log(`Value inserted`);
      });
    });
  });
}
connection.connect();
createAndUseDb("Meetup");
createTables(tables);
insertValues(values);

connection.end();
