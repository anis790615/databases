const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
  multipleStatements: true,
});
db.connect();
db.query(
  `CREATE TABLE IF NOT EXISTS Authors(author_no INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(50),
  university VARCHAR(250), 
  date_of_birth DATE,
  h_index INT, gender ENUM('m','f','o'));`,
  (error, results, fields) => {
    if (error) throw error;
    console.log("Table created...");
  }
);
db.query(
  `ALTER TABLE Authors
   ADD COLUMN collaborator INT,
   ADD CONSTRAINT fk_author FOREIGN KEY(collaborator) REFERENCES Authors(author_no); `,
  (error, results, fields) => {
    if (error) throw error;
    console.log("Column Added...");
  }
);
db.end();
