class AbstractTable{
    constructor(name){
        this.tableName = name;
        this.connect = require('./connect');
        this.DB_NAME = "sep_crud"
    }

    async read(limit = 10){
        let query = `
        select * 
            from ${this.tableName} 
            limit ${limit}
        `;

        let res = await this.connect.query(query);
        /*
        res = res.map((e)=>{return {
            column: e.COLUMN_NAME,
            type : e.DATA_TYPE
        }})*/
        return res;
    }

    write(){

    }

    update(){

    }

    delete(){

    }

    async getAllField(){
        let query = `
        select * 
            from information_schema.columns 
            where table_schema = '${this.DB_NAME}' 
            and table_name = '${this.tableName}'
        `;

        let res = await this.connect.query(query);

        res = res.map((e)=>{return {
            column: e.COLUMN_NAME,
            type : e.DATA_TYPE
        }});
        return res;
    }
}

module.exports = AbstractTable;