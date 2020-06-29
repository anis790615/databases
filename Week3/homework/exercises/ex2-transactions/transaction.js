const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
const TRANSFER_DETAILS = [
  {
    accountFrom: 100001,
    accountTo: 100002,
    amount: 1000,
    remark: "Contract Advance Payment",
  },
  {
    accountFrom: 100006,
    accountTo: 100004,
    amount: 500,
    remark: "Debt repayment",
  },
  {
    accountFrom: 100010,
    accountTo: 100005,
    amount: 1000,
    remark: "Rent for December",
  },
  {
    accountFrom: 100008,
    accountTo: 100009,
    amount: 400,
    remark: "Payment for item #40003",
  },
  { accountFrom: 100009, accountTo: 100003, amount: 0.5, remark: "" },
];
const execQuery = util.promisify(connection.query.bind(connection));
async function transferTransaction(transactionDetails) {
  try {
    await execQuery("START TRANSACTION");
    await execQuery(
      `UPDATE account SET balance = (balance - ?) WHERE account_number = ?;`,
      [transactionDetails.amount, transactionDetails.accountFrom]
    );
    await execQuery(
      `UPDATE account SET balance = (balance + ?) WHERE account_number = ?;`,
      [transactionDetails.amount, transactionDetails.accountTo]
    );
    await execQuery(
      `INSERT INTO account_changes (account_number, amount, remark)
    VALUES (?,?,?);`,
      [
        transactionDetails.accountFrom,
        -transactionDetails.amount,
        transactionDetails.remark,
      ]
    );
    await execQuery(
      `INSERT INTO account_changes (account_number, amount, remark)
    VALUES (?,?,?);`,
      [
        transactionDetails.accountTo,
        +transactionDetails.amount,
        transactionDetails.remark,
      ]
    );

    await execQuery("COMMIT");
    console.log(
      `A total of ${transactionDetails.amount} was transferred from account#${transactionDetails.accountFrom} to account#${transactionDetails.accountTo}`
    );
  } catch (error) {
    console.log(error);
    await execQuery("ROLLBACK");
    connection.end();
  }
}

async function transferMoney() {
  await Promise.all(
    TRANSFER_DETAILS.map(async (transfer) => {
      await transferTransaction(transfer);
    })
  );

  console.log("All transactions Completed");
  connection.end();
}

transferMoney();
