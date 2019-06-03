var express = require('express');
var router = express.Router();
const FrontController = require("../BusinessTier/FrontController");
let frontController = new FrontController();
/* GET home page. */
router.get('/', frontController.getIndex);
router.post('/add-tour',frontController.postAddTour);
router.post('/delete-tour',frontController.postDeleteTour);
router.post('/edit-tour',frontController.postEditTour);

module.exports = router;
