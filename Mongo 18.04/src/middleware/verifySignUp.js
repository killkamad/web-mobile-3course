const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkUsernameAndEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err){
            return res.status(500).send({message: err})
        }
        if(user){
            return res.status(400).send({message: 'Username is already taken'});
        }
        User.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if(err){
                return res.status(500).send({message: err});
            }
            if(email){
                res.status(400).send({message: 'Email is already in use'});
            }
            next();
        });
    });
}

checkRole = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.include(req.body.roles[i])){
                return res.status(400).send({message: 'No such role'})
            }
        }
    }
    next();
}

module.exports = {checkUsernameAndEmail, checkRole};