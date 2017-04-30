var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dbPath = "mongodb://admin:admin@ds127391.mlab.com:27391/rider2yby";
var db = mongojs(dbPath);
router.get('/', (req, res) => {
    let long = parseFloat(req.query.long);
    let lat = parseFloat(req.query.lat);
    var location = db.collection('clubs');
    location.createIndex({ 'location': '2dsphere' });
    var cursor = location
        .find({
            'location': {
                '$near': {
                    '$geometry': { 'type': 'Point', 'coordinates': [long, lat] },
                    '$maxDistance': 10000
                }
            }
        });
    cursor.toArray((err, data) => {
        console.log(data);
        res.send(data);
        res.end();
        db.close();

    });
});
module.exports = router;