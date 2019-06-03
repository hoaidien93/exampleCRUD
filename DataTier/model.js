var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hoaidien:KBMBuRLTKD94n5K@ds123753.mlab.com:23753/dulich";
var dbo;

class Model{
    constructor(){
         //Connect dtb:
         MongoClient.connect(url,{useNewUrlParser: true },(err,db)=> {
            if (err) throw  err;
            dbo = db.db("dulich");
        });
    }

    async getAllInfo(){
        var result = await dbo.collection("TourDuLich").find({}).toArray();
        return result;
    }

    async addTour(tourInfo){
        // Check is Exists TourID
        var check = await dbo.collection("TourDuLich").find({"TourID": tourInfo.TourID}).toArray();
        if(check.length > 0) return false;
        var result = await dbo.collection("TourDuLich").insert(tourInfo);
        return true;
    }

    async deleteTour(query){
        var result = await dbo.collection("TourDuLich").remove(query);
        return result;
    }

    async editTour(tourInfo){
        var query = {
            TourID : tourInfo.TourID
        };
        var result = await dbo.collection("TourDuLich").update(query,{$set : tourInfo});
        return result;
    }
}

module.exports = Model;