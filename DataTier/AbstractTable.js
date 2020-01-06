class AbstractTable {
    constructor(database, name) {
        this.tableName = name;
        this.connect = require('./connect');
        this.DB_NAME = database;
        this.hiddenField = [];

        this.connect.changeUser({database: this.DB_NAME});

    }

    async getAllTable() {
        let query = `
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='${this.DB_NAME}' 
        `;
        let res = await this.connect.query(query);
        res = res.map((e) => {
            return e.TABLE_NAME
        });
        return res;
    }

    async read(limit = 10) {
        let query = `
        select * 
            from ${this.tableName} 
            limit ${limit}
        `;
        let res = await this.connect.query(query);
        return res;
    }

    async add(object) {
        let allField = "(";
        let allValue = "(";

        for (const [key, value] of Object.entries(object)) {
            allField += `${key},`;
            allValue += `'${value}',`
        }
        ;
        allField = allField.slice(0, allField.length - 1);
        allField += ')';
        allValue = allValue.slice(0, allValue.length - 1);
        allValue += ')';

        let query = `
            INSERT INTO ${this.tableName} ${allField} VALUES ${allValue};
        `
        try {
            await this.connect.query(query);
            return 1;
        } catch (e) {
            return false;
        }
    }

    async update(oldObject, newObject) {
        let queryUpdate = "";
        for (const [key, value] of Object.entries(oldObject)) {
            queryUpdate += `${key} = '${value}' and `
        }
        ;
        queryUpdate = queryUpdate.slice(0, queryUpdate.length - 5);

        let queryNewObject = "";
        for (const [key, value] of Object.entries(newObject)) {
            queryNewObject += `${key} = '${value}' , `
        }
        ;
        queryNewObject = queryNewObject.slice(0, queryNewObject.length - 3);
        let query = `  
            Update ${this.tableName} 
            Set  ${queryNewObject}
            where ${queryUpdate}
        `;
        try {
            await this.connect.query(query);
            return 1;
        } catch (e) {
            return false;
        }
    }

    async delete(dataDelete) {
        let queryDelete = "";

        for (const [key, value] of Object.entries(dataDelete)) {
            queryDelete += `${key} = '${value}' and `
        }
        ;
        queryDelete = queryDelete.slice(0, queryDelete.length - 5)
        let query = `
            Delete 
            from ${this.tableName}
            where ${queryDelete}
            limit 1
        `;
        try {
            await this.connect.query(query);
            return 1;
        } catch (e) {
            return false;
        }
    }

    async getAllField() {
        let query = `
        select * 
            from information_schema.columns 
            where table_schema = '${this.DB_NAME}' 
            and table_name = '${this.tableName}'
        `;

        let res = await this.connect.query(query);

        res = res.map((e) => {
            return {
                column: e.COLUMN_NAME,
                type: e.DATA_TYPE,
                notHiddenField: !this.hiddenField.includes(e.COLUMN_NAME)
            }
        });
        return res;
    }

    async getPrimarykey() {
        let query = ` 
            SHOW KEYS FROM ${this.tableName} WHERE Key_name = 'PRIMARY'
        `;
        let res = await this.connect.query(query);
        if (res.length > 0) {
            return res.map((e) => {
                return e.Column_name
            });
        } else {
            await this.createPrimaryKey();
            return this.getPrimarykey();
        }
    }

    async createPrimaryKey() {
        let query = ` 
            alter table ${this.tableName} ADD column SEP_ID int AUTO_INCREMENT,
            ADD PRIMARY KEY(SEP_ID);
        `;

        await this.connect.query(query);
    }
}

module.exports = AbstractTable;