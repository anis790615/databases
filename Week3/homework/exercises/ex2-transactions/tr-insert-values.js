const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
const accounts = [
  { account_number: 100001, balance: 1000 },
  { account_number: 100002, balance: 500 },
  { account_number: 100003, balance: 30 },
  { account_number: 100004, balance: -100 },
  { account_number: 100005, balance: 0 },
  { account_number: 100006, balance: 12000 },
  { account_number: 100007, balance: 375 },
  { account_number: 100008, balance: 300 },
  { account_number: 100009, balance: 40 },
  { account_number: 100010, balance: 100000 },
];

// I inserted only account table data, where data in account_changes will be only from created transactions, and not inserted manaually.
connection.connect();
accounts.forEach((account) => {
  connection.query(
    "INSERT INTO account SET ?",
    account,
    (error, results, fields) => {
      if (error) throw error;
      console.log(`Account ${account.account_number} created`);
    }
  );
});

connection.end();
