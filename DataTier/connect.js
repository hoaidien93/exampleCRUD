const util = require('util');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sep_crud"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
});
con.query = util.promisify(con.query);

module.exports = con;