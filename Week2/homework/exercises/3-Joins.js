const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
db.connect();
// Selecting Authors & Their Collaborators
// db.query(
//   `SELECT Authors2.author_name AS Author, Authors1.author_name AS Collaborator FROM Authors AS Authors1 INNER JOIN Authors AS Authors2 ON Authors1.author_no = Authors2.collaborator;
//   ;
//   ;`,
//   (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//   }
// );
// Authors and their papers
db.query(
  `
  SELECT author_name, paper_title  FROM Authors 
  LEFT JOIN Author_Papers ON Authors.author_no = Author_Papers.author_id 
  LEFT JOIN Research_Papers ON Author_Papers.paper_id  = Research_Papers.paper_id ;
  `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

db.end();
