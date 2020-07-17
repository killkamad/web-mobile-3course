const Movie = require('../models/movie');
const moment = require('moment');

const days = ['Today', 'Tomorrow', moment().add(2, 'days').format('ddd, MMM D')];

const times = ['9:00 AM', '11:10 AM', '12:00 PM', '1:50 PM', '4:30 PM', '6:00 PM', '7:10 PM', '9:45 PM'];

async function getMovie_id(req, res, next) {
    try {
        Movie.find().lean().exec((err, movies) => res.json(
            {
                movies: movies.map(movie => ({
                    ...movie,
                    days,
                    times
                }))
            }
        ))
        movie = await Movie.findById(req.params.id);
        if (movie == null) {
            return res.status(404).json({ message: 'Cant find this Movie'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.movie = movie;
    next()
}

// // async function getMovie_id(req, res, next) {
//     // lean makes search faster
//     Movie.findById().lean().exec((err, movies) => res.json(
//         {
//             movies: movies.map(movie => ({
//                 ...movie,
//                 days,
//                 times
//             }))
//         }
//     ))
// };

module.exports = getMovie_id;