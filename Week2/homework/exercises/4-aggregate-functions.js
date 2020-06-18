const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
db.connect();
// 1- All research Papers and the number of authors that wrote that paper
db.query(
  `
  SELECT paper_title, COUNT(author_id) AS Number_of_Authors  FROM Research_Papers 
  JOIN Author_Papers ON Author_Papers.paper_id  = Research_Papers.paper_id
  GROUP BY paper_title;
  `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);
// 2- Sum of research papers published by all female authors.
db.query(
  `
  SELECT COUNT(paper_title) AS Number_of_papers_by_female_authors FROM Research_Papers 
  JOIN Author_Papers ON Author_Papers.paper_id  = Research_Papers.paper_id 
  JOIN Authors ON Authors.author_no = Author_Papers.author_id
  WHERE gender = 'f';
  `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);
// // 3- Average of the h-index of all authors per university.
db.query(
  `
  SELECT university, AVG(h_index) AS Average_h_index 
  FROM Authors
  GROUP BY university;

  `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);
// // 4- Sum of the research papers of the authors per university.
db.query(
  `
    SELECT university, COUNT(DISTINCT paper_title)
    AS Sum_of_research_papers FROM Authors 
    JOIN Author_Papers ON Authors.author_no = Author_Papers.author_id
    JOIN Research_Papers ON Author_Papers.paper_id  = Research_Papers.paper_id 
    GROUP BY university;
  `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);
// // 5- Minimum and maximum of the h-index of all authors per university.
db.query(
  `
  SELECT university, MIN(h_index), MAX(h_index) 
  FROM Authors
  GROUP BY university;
  `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

db.end();
