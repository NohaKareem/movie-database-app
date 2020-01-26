var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie.js');

const APP_TITLE = "Movie Database App";
const RESULTS_PER_PAGE = 12;

/* GET all distinct genres */
router.get('/', function(req, res, next) {
    var query = Movie.find().distinct('genres'); 
    query.exec(function(err, genres) {
    if(err) return next(err);
    // res.json(genres);
    res.render('genres', { title: APP_TITLE, genres:genres });
  });
});

/* GET paginated genre results */
router.get('/:genre/page/:page', function(req, res, next) {
    // return cardinality of genres collection
    let results_count = 0;
    var totalPageCount;
    Movie.find({ genres: capitalize(req.params.genre) }).count(function(err, count){
        results_count = count;
        totalPageCount = results_count/RESULTS_PER_PAGE;
    });

    // compute total number of pages
    if(totalPageCount % 1 > 0) totalPageCount++;

    var pageNumber = parseInt(req.params.page ? req.params.page : 0);
    var query = Movie.find({ genres: capitalize(req.params.genre) }).skip((pageNumber - 1) * RESULTS_PER_PAGE)
                .limit(RESULTS_PER_PAGE).sort({ title: 'asc' }); 
    query.exec(function(err, movies) {
        if(err) return next(err);
        // res.json(movies);
        res.render('movies-by-genre', { title: APP_TITLE, movies:movies, genre:req.params.genre, pageNumber:pageNumber, totalPageCount:totalPageCount });
    });
});

/* Helper methods */
/* returns a capitalized version (first letter) of an input string, str */
function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1);
}

module.exports = router;