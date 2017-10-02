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
var UserModel = Schema.UserModel;

BrandModel.remove({}, function (err) {
    console.log(err);
});

const nikon = new BrandModel({ name: 'Nikon', founder: 'Nippon Kōgaku', stockSymbol: 'TYO'})
const canon = new BrandModel({ name: 'Canon', founder: 'Takeshi Mitarai', stockSymbol: 'CAJ'})
const sony = new BrandModel({ name: 'Sony', founder: 'Masaru Ibuka', stockSymbol: 'SNE'})

const d850 = new CameraModel({ name: 'D850', price: 3299.95, color: 'black', lensSize: 80}) 
const d610 = new CameraModel({ name: 'D610', price: 1499.95, color: 'red', lensSize: 55}) 
const d5 = new CameraModel({ name: 'D5', price: 6499.95, color: 'blue', lensSize: 90}) 

const eos1D = new CameraModel({ name: 'EOS1D', price: 5999.00, color: 'black', lensSize: 90}) 
const eos5D = new CameraModel({ name: 'EOS5D', price: 3699.95, color: 'silver', lensSize: 55}) 
const eos6D = new CameraModel({ name: 'EOS6D', price: 3099.00, color: 'blue', lensSize: 30}) 

const a9 = new CameraModel({ name: 'A9', price: 4999.00, color: 'black', lensSize: 80}) 
const a7R = new CameraModel({ name: 'A7R', price: 2699.99, color: 'black', lensSize: 60}) 
const a5000 = new CameraModel({ name: 'A5000', price: 499.00, color: 'white', lensSize: 25}) 

const brands = [nikon, canon, sony]
const cameras = [d850, d610, d5]
const cameras2 = [eos1D, eos5D, eos6D]
const cameras3 = [a9, a7R, a5000]

const jonathan = new UserModel({ name: 'jonathan', email: 'jonathan@gmail.com'})

// assign cameras to each brand.
brands.forEach((brand) => {
    
        nikon.cameras = cameras
        canon.cameras = cameras2
        sony.cameras = cameras3
    
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