const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const Role = db.role;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: 'Starting new api'});
});

// const initializeRoles = () => {
// //     db.role.estimatedDocumentCount((err, count) => {
// //         if(err){
// //             console.log('Error', err);
// //         }
// //         if(!err && count === 0){
// //             new Role({
// //                 name: 'user'
// //             }).save(err => {
// //                 if(err){
// //                     console.log('Error', err);
// //                 }
// //                 console.log('New role user added to collection');
// //             });
// //             new Role({
// //                 name: 'admin'
// //             }).save(err => {
// //                 if(err){
// //                     console.log('Error', err);
// //                 }
// //                 console.log('New role admin added to collection');
// //             });
// //             new Role({
// //                 name: 'owner'
// //             }).save(err => {
// //                 if(err){
// //                     console.log('Error', err);
// //                 }
// //                 console.log('New role owner added to collection');
// //             })
// //         }
// //     })
// // };
// После запуска не нужна;

db.mongoose.connect('mongodb://localhost:27017/midterm', {
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

app.listen(3000, () => console.log('Server started'));