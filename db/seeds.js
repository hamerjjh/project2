require('dotenv').config();

var mongoose = require('mongoose');
var Schema = require("./schema.js");

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("database has been connected!");
});

var BrandModel = Schema.BrandModel;
var CameraModel = Schema.CameraModel;

BrandModel.remove({}, function (err) {
    console.log(err);
});

const nikon = new BrandModel({ name: 'Nikon', country: 'Japan'})
const canon = new BrandModel({ name: 'Canon', country: 'Japan'})
const sony = new BrandModel({ name: 'Sony', country: 'Japan'})

const d850 = new CameraModel({ name: 'D850', price: 3299.95}) 
const d610 = new CameraModel({ name: 'D610', price: 1499.95}) 
const d5 = new CameraModel({ name: 'D5', price: 6499.95}) 

const brands = [nikon, canon, sony]
const cameras = [d850, d610, d5]

// assign cameras to each brand.
brands.forEach((brand) => {
    
        brand.cameras = cameras
    
        brand.save()
            .then((brand) => {
                console.log(`${brand.name} saved!`)
            })
            .catch((error) => {
                console.log(error)
            })
    });
    
    // Disconnect from database
    db.close();