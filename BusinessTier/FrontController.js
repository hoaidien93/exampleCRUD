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
}

module.exports = FrontController;