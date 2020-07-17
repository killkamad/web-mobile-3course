const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/movies', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// 	useCreateIndex: true,
//     useFindAndModify: true
// });


mongoose.connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
    .then(() => {
        console.log('Successfully connected');
        // initializeRoles();
    }).catch(err => {
    console.log('Error occured', err);
    process.exit();
});
app.use(express.json());

app.use(morgan('combined'));
const router = require('./router');
// Use v1 as prefix for all API endpoints
app.use('/v1', router);
app.listen(3000, () => console.log('Server started'));
