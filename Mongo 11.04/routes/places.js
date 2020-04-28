// http://localhost:3000/restaurants/places
// https://76aa8373.ngrok.io/restaurants/places
const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Get all places
router.get('/places', async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Getting one place
router.get('/places/:id', getPlace, (req, res) => {
    res.json(res.place)
});

// Creating one place
router.post('/places', async (req, res) => {
    const place = new Place({
        name: req.body.name,
        description: req.body.description,
        owner: req.body.owner,
    });

    try {
        const newPlace = await place.save();
        res.status(201).json(newPlace)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Updating one place
router.patch('/places/:id', getPlace, async (req, res) => {
    if (req.body.name != null) {
        res.place.name = req.body.name
    }

    if (req.body.description != null) {
        res.place.description = req.body.description
    }

    if (req.body.owner != null) {
        res.place.owner = req.body.owner
    }

    try {
        const updatedPlace = await res.place.save();
        res.json(updatedPlace)
    } catch {
        res.status(400).json({ message: err.message })
    }

});

// Deleting one place
router.delete('/places/:id', getPlace, async (req, res) => {
    try {
        await res.place.remove();
        res.json({ message: 'Deleted This Place' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

async function getPlace(req, res, next) {
    try {
        place = await Place.findById(req.params.id);
        if (place == null) {
            return res.status(404).json({ message: 'Cant find this Place'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.place = place;
    next()
}

module.exports = router;
