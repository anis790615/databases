const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
  multipleStatements: true,
});
const CREATE_ACCOUNT_TABLE_QUERY = `
    DROP TABLE IF EXISTS account;
    CREATE TABLE IF NOT EXISTS account 
    (account_number INT NOT NULL PRIMARY KEY,
    balance DECIMAL(13, 2));
`;
const CREATE_TABLE_CHANGES_QUERY = `
    DROP TABLE IF EXISTS account_changes;
    CREATE TABLE IF NOT EXISTS account_changes
    (change_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    account_number INT NOT NULL,
    amount DECIMAL(13, 2),
    changed_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    remark VARCHAR(255))
    ;
`;
connection.connect();
connection.query(CREATE_ACCOUNT_TABLE_QUERY, (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});
connection.query(CREATE_TABLE_CHANGES_QUERY, (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});
connection.end();
