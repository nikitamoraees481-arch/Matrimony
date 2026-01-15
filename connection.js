const mysql = require("mysql2");
const util = require("util")

const conn = mysql.createConnection({
    host: "brf60mj4pwefklggzb50-mysql.services.clever-cloud.com",
    user: "brf60mj4pwefklggzb50",
    password: "NkW2UBud0eBIXo364HcC",
    database: "brf60mj4pwefklggzb50"
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
