const util = require("util");
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

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
const CREATE_RESEARCH_PAPERS_TABLE = `
  CREATE TABLE IF NOT EXISTS Research_Papers
  (paper_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(100),
  conference VARCHAR(50), 
  publish_date DATE);`;
const CREATE_AUTHORS_PAPERS_TABLE = `
  CREATE TABLE IF NOT EXISTS Author_Papers
  (paper_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY(paper_id, author_id),
  FOREIGN KEY (paper_id) 
  REFERENCES Research_Papers(paper_id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) 
  REFERENCES Authors(author_no) ON DELETE CASCADE);`;
// Because data that references unexisting elements can't be entered two queries are created, first to drop the foreign key of the collborator column, and then to set again after the data was entered. Another option might be to enter the data into the collborator column separately
const DROP_FOREIGN_KEY = `
  ALTER TABLE Authors 
  DROP FOREIGN KEY fk_author;
  `;
const ADD_FOREIGN_KEY = `
  ALTER TABLE Authors
  ADD CONSTRAINT fk_author FOREIGN KEY(collaborator) 
  REFERENCES Authors(author_no);
`;

async function createAndFillTables() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);
  const runQuery = util.promisify(connection.query.bind(connection));
  try {
    // Creating the table research papers and the link table author_research papers, dropping them first at the beginning of each run for testing.
    await runQuery(dropTable("Author_Papers"));
    console.log("Table Author_Papers dropped ...");
    await runQuery(dropTable("Research_Papers"));
    console.log("Table Research_Papers dropped ...");
    await runQuery(CREATE_RESEARCH_PAPERS_TABLE);
    console.log("Table Research_Papers Created ...");
    await runQuery(CREATE_AUTHORS_PAPERS_TABLE);
    console.log("Table Author_Papers Created ...");
    // Fetching data to be inserted from files, each data fetched separately for authors, researc papers, and author_papers
    const authorsData = await readFile(
      path.join(__dirname, "/authors.json"),
      "utf8"
    );
    const authors = JSON.parse(authorsData);
    const papersData = await readFile(
      path.join(__dirname, "/research-papers.json"),
      "utf8"
    );
    const papers = JSON.parse(papersData);
    const authorPapersData = await readFile(
      path.join(__dirname, "/author-papers.json"),
      "utf8"
    );
    const authorPapers = JSON.parse(authorPapersData);

    // Insert data into Authors table
    // First foreign key is dropped
    await runQuery(DROP_FOREIGN_KEY);
    console.log("Foreign key fk_author dropped");
    // Insert Data
    const insertAuthorDataPromises = authors.map((author) =>
      runQuery("INSERT INTO Authors SET ?", author)
    );
    await Promise.all(insertAuthorDataPromises);
    console.log("Authors information has been inserted... ");

    // Add foreign key
    await runQuery(ADD_FOREIGN_KEY);
    console.log("Foreign key fk_author added");

    // Insert data into Research Papers table
    const insertPaperDataPromises = papers.map((paper) =>
      runQuery("INSERT INTO Research_Papers SET ?", paper)
    );
    await Promise.all(insertPaperDataPromises);
    console.log("Research paper information has been inserted... ");
    // Insert data into Author_Papers table
    const insertAuthorPaperDataPromises = authorPapers.map((authorPaper) =>
      runQuery("INSERT INTO Author_Papers SET ?", authorPaper)
    );
    await Promise.all(insertAuthorPaperDataPromises);
    console.log("Author-Paper Relation information has been inserted... ");

    connection.end();
  } catch (err) {
    console.log(err.message);
    connection.end();
  }
}
createAndFillTables();
