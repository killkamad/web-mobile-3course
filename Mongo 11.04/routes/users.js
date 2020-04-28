// http://localhost:3000/restaurants/users
// https://76aa8373.ngrok.io/restaurants/users
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Getting one user
router.get('/users/:id', getUser, (req, res) => {
    res.json(res.user)
});

// Creating one user
router.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Updating one user
router.patch('/users/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }

    if (req.body.email != null) {
        res.user.email = req.body.email
    }

    if (req.body.role != null) {
        res.user.role = req.body.role
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser)
    } catch {
        res.status(400).json({ message: err.message })
    }

});

// Deleting one user
router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted This User' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.user = user;
    next()
}

module.exports = router;
