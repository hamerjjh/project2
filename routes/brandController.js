const express = require('express')
const router = express.Router()
const Schema = require("../db/schema.js");
const BrandModel = Schema.BrandModel;
/* Index Route */
router.get('/', (req, res) => {
    BrandModel.find({})
    .then((brands) => {
        res.render('brands/index', {
            brands: brands
        })
    })
})

module.exports = router;