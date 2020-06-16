const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
  multipleStatements: true,
});
db.connect();
// Creating the research papers table with a primay key of paper_id
db.query(
  `DROP TABLE IF EXISTS Research_Papers;
  CREATE TABLE IF NOT EXISTS Research_Papers
  (paper_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(100),
  conference VARCHAR(50), 
  publish_date DATE);`,
  (error, results, fields) => {
    if (error) throw error;
    console.log("Research Papers Table created...");
  }
);
// As the relation ship between Authors and paper is many-to-many a authors_papers table is created
db.query(
  `DROP TABLE IF EXISTS Author_Papers;
  CREATE TABLE IF NOT EXISTS Author_Papers
  (paper_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY(paper_id, author_id),
  FOREIGN KEY (paper_id) REFERENCES Research_Papers(paper_id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES Authors(author_no) ON DELETE CASCADE);`,
  (error, results, fields) => {
    if (error) throw error;
    console.log("Author Paper Table created...");
  }
);

db.end();
