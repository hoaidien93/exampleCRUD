const Model = require("../DataTier/model");
let model = new Model();
const AbstractTable = require("../DataTier/AbstractTable");
class FrontController {
    async getIndex(req, res) {
        //var tourInfo = await model.getAllInfo();
        let allTable = await model.getAllTable();
        return res.render('index', { allTable: allTable });

    }

    async getTable(req,res){
        
        let tableName = req.params.tableName; 

        let tableEntity = new AbstractTable(tableName);
        let tableData = await tableEntity.read();
        let tableInfo = await tableEntity.getAllField(tableName);

        return res.render('tableDetail', {
            tableInfo: tableInfo,
            tableData : tableData,
            tableName : tableName
        });
    }

    async deleteRow(req,res){
        let tableName = req.body.tableName;
        let dataDelete = req.body.data;
        let tableEntity = new AbstractTable(tableName);
        let result = await tableEntity.delete(dataDelete);
        return res.send({
            "status": "Success"
        });
    }

    async updateRow(req,res){
        console.log(req.body);
        let tableName = req.body.tableName;
        let tableEntity = new AbstractTable(tableName);

        let result = await tableEntity.update(req.body.data.oldObject,req.body.data.newObject);
        console.log(result);
        return res.send({
            "status": "Success"
        });
    }

    async addRow(req,res){
        let tableName = req.body.tableName;
        let tableEntity = new AbstractTable(tableName);

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