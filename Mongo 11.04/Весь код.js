require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json());

const usersRouter = require('./routes/users');
const placeRevRouter = require('./routes/placesReview');
const placeRouter = require('./routes/places');

app.use('/restaurants', usersRouter);
app.use('/restaurants', placeRouter);
app.use('/restaurants', placeRevRouter);

app.listen(3000, () => console.log('server started'));

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('place', placeSchema);


const mongoose = require('mongoose');

const placeReviewSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('placeRev', placeReviewSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('user', userSchema);


// http://localhost:3000/restaurants/places
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



// http://localhost:3000/restaurants/places
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


// http://localhost:3000/restaurants/users
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



