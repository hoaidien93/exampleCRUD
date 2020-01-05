var MongoClient = require('mongodb').MongoClient;
class Model {

    constructor() {
        //Connect dtb:
        this.connect = require('./connect');
        this.DB_NAME = "sep_crud"
    }

    async getAllTable() {
        let query = `
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='${this.DB_NAME}' 
        `;
        let res = await this.connect.query(query);
        res = res.map((e) => { return e.TABLE_NAME });
        return res;
    }
}

module.exports = Model;