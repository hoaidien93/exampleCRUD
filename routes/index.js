var express = require('express');
var router = express.Router();
const FrontController = require("../BusinessTier/FrontController");
let frontController = new FrontController();
/* GET home page. */
router.get('/', frontController.getIndex);
router.get('/table-detail/:tableName',frontController.getTable);

module.exports = router;