const mongoose = require('mongoose');

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
const Schema = mongoose.Schema;

const CameraSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    lensSize: {
        type: Number,
        required: true
    }
})

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    camera: [CameraSchema]
});

const BrandModel = mongoose.model('Brand', BrandSchema)
const CameraModel = mongoose.model('Camera', CameraSchema)

module.exports = {
    BrandModel: BrandModel,
    CameraModel: CameraModel
}