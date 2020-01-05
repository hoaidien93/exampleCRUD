var express = require('express');
var router = express.Router();
const FrontController = require("../BusinessTier/FrontController");
let frontController = new FrontController();
/* GET home page. */
router.get('/', frontController.getIndex);
router.get('/table-detail/:tableName',frontController.getTable);
router.get('/list-table/:database',frontController.getListTable);
router.post('/table-detail/delete',frontController.deleteRow);
router.post('/table-detail/update',frontController.updateRow);
router.post('/table-detail/add',frontController.addRow);
module.exports = router;