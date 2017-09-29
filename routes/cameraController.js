const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const BrandModel = Schema.BrandModel;

// INDEX route
router.get('/', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // Use the BrandModel to find the brand by ID
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once you have found the brand in the database
            // RENDER the brand and its EMBEDDED snowboard info 
            // using Handlebars
         res.render('cameras/index', {
                brand: brand
            })
        })
        .catch((error) => {
            console.log(error)
        })

})

// NEW route
router.get('/new', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // RENDER a new form for a fresh Camera,
    // also passing the brandId to use in the
    // form's ACTION
 res.render('cameras/new', {
        brandId: brandId
    })
})

// CREATE route
router.post('/', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // GRAB the new camera info from the req body
    const newCamera = req.body

    // USE the BrandModel to find the brand by ID
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once you have found the brand from the database
            // PUSH the new snowboard object into the brand's 
            // snowboard array            
            brand.cameras.push(newCamera)

            // SAVE the brand and return the PROMISE
            return brand.save()
        })
        .then((brand) => {
            // THEN once the brand has been saved, 
            // REDIRECT to the cameras index for that brand
         res.redirect(`/brands/${brandId}/cameras`)
        })

})

// EDIT route
router.get('/:cameraId/edit', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // GRAB the camera ID from the parameters
    const cameraId = req.params.cameraId

    // USE the BrandModel to find the brand by ID
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once the brand has been returned,
            // FIND the camera by ID that you want to edit
            const camera = brand.cameras.id(cameraId)

            // RENDER a form pre-populated with that camera info,
            // ALSO passing the brandId to use for the form's ACTION
         res.render('cameras/edit', {
                camera: camera,
                brandId: brandId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE route
router.put('/:cameraId', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId

    // GRAB the camera ID from the parameters
    const cameraId = req.params.cameraId

    // GRAB the updated camera object from the req body
    const updatedCamera = req.body

    // USE the BrandModel to find the brand by ID
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once the brand has been returned,
            // FIND the camera by ID from the brand's cameras
            const camera = brand.cameras.id(cameraId)

            // MAP each attribute from the updated camera object to
            // the same attribute on the original camera
            camera.name = updatedCamera.name
            camera.price = updatedCamera.price

            // SAVE the updated brand and return the PROMISE
            return brand.save()
        })
        .then(() => {
            // THEN once the brand has saved, REDIRECT to the 
            // camera's SHOW page
         res.redirect(`/brands/${brandId}/cameras/${cameraId}`)
        })

})

// SHOW route
router.get('/:cameraId', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId
    
    // GRAB the camera ID from the parameters
    const cameraId = req.params.cameraId

    // USE the BrandModel to find the brand by ID
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once the brand has been returned,
            // FIND the camera by ID from the brand's cameras
            const camera = brand.cameras.id(cameraId)

            // THEN render the camera info using Handlebars
            // and pass the brandId to use in link URLs
         res.render('cameras/show', {
                camera: camera,
                brandId: brandId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE route
router.get('/:cameraId/delete', (req, res) => {

    // GRAB the brand ID from the parameters
    const brandId = req.params.brandId
    
    // GRAB the camera ID from the parameters
    const cameraId = req.params.cameraId

    // USE the BrandModel to find the brand by ID
    BrandModel.findById(brandId)
        .then((brand) => {
            // THEN once the brand has been returned,
            // REMOVE the camera from the brand's camera array
            const camera = brand.cameras.id(cameraId).remove()

            // THEN save the brand and return the PROMISE
            return brand.save()
        })
        .then(() => {
            // THEN once the brand has saved, redirect to the 
            // brand's cameras INDEX page
         res.redirect(`/brands/${brandId}/cameras`)
        })
})


module.exports = router