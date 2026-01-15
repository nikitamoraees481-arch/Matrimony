const mysql = require("mysql2");
const util = require("util")

const conn = mysql.createConnection({
    host: "brf60mj4pwefklggzb50-mysql.services.clever-cloud.com",
    user: "ud79ocqrwm2gsjrt",
    password: "NkW2UBud0eBIXo364HcC",
    database: "brf60mj4pwefklggzb50"
});
const exe = util.promisify(conn.query).bind(conn);



module.exports = exe;
