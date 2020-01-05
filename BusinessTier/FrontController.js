const Model = require("../DataTier/model");
let model = new Model();
const AbstractTable = require("../DataTier/AbstractTable");
let database = "";
class FrontController {
    async getIndex(req, res) {
        //let allTable = await model.getAllTable();
        let listDatabase = await model.showDatabase();
        return res.render('chooseDatabase',{listDatabase: listDatabase});
    }

    async getListTable(req,res){
        let databaseChoose = req.params.database;
        database = databaseChoose;
        let allTable = await model.getAllTable(database);
        return res.render('index', { allTable: allTable });
    }
    
    async getTable(req,res){
        let tableName = req.params.tableName; 
        let tableEntity = await new AbstractTable(database,tableName);
        let tableData = await tableEntity.read();
        let tableInfo = await tableEntity.getAllField(tableName);

        return res.render('tableDetail', {
            tableInfo: tableInfo,
            tableData : tableData,
            tableName : tableName,
            database: database
        });
    }

    async deleteRow(req,res){
        let tableName = req.body.tableName;
        let dataDelete = req.body.data;
        let tableEntity = new AbstractTable(database,tableName);
        let result = await tableEntity.delete(dataDelete);
        if(result){
            return res.send({
                "status": "Success"
            });
        }
        return res.send({
            "status": "Fail"
        });
    }

    async updateRow(req,res){
        let tableName = req.body.tableName;
        let tableEntity = new AbstractTable(database,tableName);
        let result = await tableEntity.update(req.body.data.oldObject,req.body.data.newObject);
        if(result){
            return res.send({
                "status": "Success"
            });
        }
        return res.send({
            "status": "Fail"
        });
    }

    async addRow(req,res){
        let tableName = req.body.tableName;
        let tableEntity = new AbstractTable(database,tableName);
        let result = await tableEntity.add(req.body.data);
        if(result){
            return res.send({
                "status": "Success"
            });
        }
        return res.send({
            "status": "Fail"
        });
    }
}

module.exports = FrontController;