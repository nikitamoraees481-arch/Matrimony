const mysql = require("mysql2");
const util = require("util")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "matrimony"
});
const exe = util.promisify(conn.query).bind(conn);

// db.connect((err) => {
//     if (err) {
//         console.log("DB Error ❌", err);
//     } else {
//         console.log("Database Connected ✅");
//     }
// });

module.exports = exe;
