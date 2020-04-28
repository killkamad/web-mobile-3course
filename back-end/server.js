const router = require('./router');
const port = 3000
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
	useCreateIndex: true,
    useFindAndModify: true
})


mongoose.connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Successfully connected');
        // initializeRoles();
    }).catch(err => {
    console.log('Error occured', err);
    process.exit();
});

const app = express()

app.use(morgan('combined'))

// Use v1 as prefix for all API endpoints
app.use('/v1', router)
app.listen(3000, () => console.log('Server started'));
