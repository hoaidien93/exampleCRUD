const util = require('util');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
});
con.query = util.promisify(con.query);
con.changeUser = util.promisify(con.changeUser);
module.exports = con;