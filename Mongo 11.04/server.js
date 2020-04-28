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

