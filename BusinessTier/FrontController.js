const Model = require("../DataTier/model");
let model = new Model();

class FrontController {
    async getIndex(req, res) {
        var tourInfo = await model.getAllInfo();
        return res.render('index', { tourInfo: tourInfo });
    }

    async postAddTour(req, res) {
        var result = await model.addTour(req.body);
        if (result) {
            return res.send({
                "status": "Success"
            });
        }
        return res.send({
            "status": "Fail"
        })
    }

    async postDeleteTour(req, res) {
        await model.deleteTour(req.body);
        return res.send({
            "status": "Success"
        });
    }

    async postEditTour(req, res) {
        await model.editTour(req.body);
        return res.redirect('/');
    }
}

module.exports = FrontController;