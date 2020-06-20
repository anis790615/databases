const util = require("util");
const mysql = require("mysql");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
  multipleStatements: true,
};
function dropTable(tableName) {
  return `DROP TABLE IF EXISTS ${tableName};`;
}
const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS Authors
    (author_no INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(50),
    university VARCHAR(250), 
    date_of_birth DATE,
    h_index INT, gender ENUM('m','f','o'));
    `;
const UPDATE_AUTHORS_TABLE = `
    ALTER TABLE Authors
    ADD COLUMN collaborator INT,
    ADD CONSTRAINT fk_author FOREIGN KEY(collaborator) 
    REFERENCES Authors(author_no);
    `;
async function createAndUpdateTables() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const runQuery = util.promisify(connection.query.bind(connection));
  try {
    await runQuery(dropTable("Authors"));
    console.log("Table Authors dropped ...");
    await runQuery(CREATE_AUTHORS_TABLE);
    console.log("Table Authors Created ...");
    await runQuery(UPDATE_AUTHORS_TABLE);
    console.log("Table Authors Updated ...");
    connection.end();
  } catch (err) {
    console.log(err.message);
    connection.end();
  }
}
createAndUpdateTables();
