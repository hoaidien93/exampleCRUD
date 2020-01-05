var MongoClient = require('mongodb').MongoClient;
class Model {

    constructor() {
        //Connect dtb:
        this.connect = require('./connect');
    }

    async getAllTable(database) {
        let query = `
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='${database}' 
        `;
        let res = await this.connect.query(query);
        res = res.map((e) => { return e.TABLE_NAME });
        return res;
    }

    async showDatabase(){
        let query = `
                SELECT schema_name 
        FROM information_schema.schemata;
        `;
        let res = await this.connect.query(query);
        return res.map((e)=>{return e.schema_name});
    }
}

module.exports = Model;