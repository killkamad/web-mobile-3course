// http://localhost:3000/restaurants/places
// https://76aa8373.ngrok.io/restaurants/places/5e9a60d17b756d02f8fb9ec8/review
const express = require('express');
const router = express.Router();
const PlaceReview = require('../models/placeReview');

// Get all placesrev
router.get('/places/:id/review', async (req, res) => {
    try {
        const placesrev = await PlaceReview.find();
        res.json(placesrev)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Getting one placesrev
router.get('/places/:id/review/:id', getPlaceRev, (req, res) => {
    res.json(res.placerev)
});

// Creating one place
router.post('/places/:id/review', async (req, res) => {
    const placerev = new PlaceReview({
        body: req.body.body,
        date: req.body.date,
        user: req.body.user,
    });

    try {
        const newPlaceRev = await placerev.save();
        res.status(201).json(newPlaceRev)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Updating one place
router.patch('/places/:id/review/:id', getPlaceRev, async (req, res) => {
    if (req.body.body != null) {
        res.placerev.body = req.body.body
    }

    if (req.body.date != null) {
        res.placerev.date = req.body.date
    }

    if (req.body.user != null) {
        res.placerev.user = req.body.user
    }

    try {
        const updatedPlaceRev = await res.placerev.save();
        res.json(updatedPlaceRev)
    } catch {
        res.status(400).json({ message: err.message })
    }

});

// Deleting one place
router.delete('/places/:id/review/:id', getPlaceRev, async (req, res) => {
    try {
        await res.placerev.remove();
        res.json({ message: 'Deleted This Place Review' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

async function getPlaceRev(req, res, next) {
    try {
        placerev = await PlaceReview.findById(req.params.id);
        if (placerev == null) {
            return res.status(404).json({ message: 'Cant find this Place Review'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.placerev = placerev;
    next()
}

module.exports = router;
