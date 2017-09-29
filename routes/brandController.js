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
    .catch((error) => {
        console.log(error)
    })
})
// NEW route
router.get('/new', (req, res) => {
    // RENDER an empty form for the new brand
 res.render('brands/new')
})

// CREATE route
router.post('/', (req, res) => {

    // GRAB the new brand info as a JS object from the req body
    const newBrand = req.body

    // CREATE and SAVE a new Brand using the BrandModel
    BrandModel.create(newBrand)
        .then(() => {
            // THEN once the model has saved, redirect to the Companies INDEX
         res.redirect('/brands')
        })
        .catch((error) => {
            console.log(error)
        })
})

// EDIT route
router.get('/:brandId/edit', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // FIND the brand by ID using the BrandModel
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once the brand has been returned from
            // the database, RENDER a form containing the current
            // brand information
         res.render('brands/edit', {
                brand: brand
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:brandId', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // GRAB the updated Brand info from the req body
    const updatedBrand = req.body

    // Use Mongoose to find the brand by ID and update it with the 
    // new brand info. Be sure to include the {new: true} option as your
    // third parameter
    BrandModel.findByIdAndUpdate(brandId, updatedBrand, { new: true })
        .then(() => {
            // THEN once the new brand info has been saved,
            // redirect to that brand's SHOW page
         res.redirect(`/brands/${brandId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// SHOW route
router.get('/:brandId', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // Use the Brand Model to find the brand by ID in the database
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once the brand comes back from the database,
            // render the single brand's info using Handlebars
         res.render('brands/show', {
                brand: brand
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE route
router.get('/:brandId/delete', (req, res) => {

    // GRAB the brand ID that you want to delete from the parameters
    const brandId = req.params.brandId

    // Use the BrandModel to find and delete the brand in the database
    BrandModel.findByIdAndRemove(brandId)
        .then(() => {

            // THEN once the brand has been deleted from the database
            // redirect back to the brands INDEX
         res.redirect('/brands')
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;