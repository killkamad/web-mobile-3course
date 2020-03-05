const request = require('request');
const consts = require('./consts');

const url = 'https://ghibliapi.herokuapp.com/films/'

const giveAnime = callback => request({url, json: true}, (error, data) => {
  if(error){
    callback(REQUEST_FAILURE);
  }else{
    callback(false, data);
  }
});

module.exports = giveAnime;
