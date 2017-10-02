const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

/* Index Route */
router.get('/', (req, res) => {
    UserModel.find({})
    .then((users) => {
        res.render('users/index', {
            users: users
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

// NEW route
router.get('/new', (req, res) => {
 res.render('users/new')
})
// CREATE route
router.post('/', (req, res) => {
        const newUser = req.body
        UserModel.create(newUser)
            .then(() => {
             res.redirect('/users')
            })
            .catch((error) => {
                console.log(error)
            })
    })
// EDIT route
router.get('/:userId/edit', (req, res) => {
    
        const userId = req.params.userId
    
        UserModel.findById(userId)
            .then((user) => {
          
             res.render('users/edit', {
                    user: user
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })
// UPDATE route
router.put('/:userId', (req, res) => {
  
        const userId = req.params.userId
   
        const updatedUser = req.body
    
        UserModel.findByIdAndUpdate(userId, updatedUser, { new: true })
            .then(() => {

             res.redirect(`/users/${userId}`)
            })
            .catch((error) => {
                console.log(error)
            })
    })
// SHOW route
// DELETE route
module.exports = router;