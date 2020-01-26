var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie.js');

const APP_TITLE = "Movie Database App";
const RESULTS_PER_PAGE = 12;

/* GET all distinct years */
router.get('/', function(req, res, next) {
  var query = Movie.find().distinct('year'); 

  query.exec(function(err, years) {
    if(err) return next(err);
    // res.json(years);
    res.render('years', { title: APP_TITLE, years:years });
  });
});

/* GET paginated year results */
router.get('/:year/page/:page', function(req, res, next) {
  var pageNumber = parseInt(req.params.page ? req.params.page : 0);
  var year = parseInt(req.params.year);

  // return cardinality of years collection
  let results_count = 0;
  var totalPageCount ;
  Movie.find({ year:year }).count(function(err, count){
      results_count = count;
      totalPageCount = results_count/RESULTS_PER_PAGE;
  });

  // compute total number of pages
  if(totalPageCount % 1 > 0) totalPageCount++;

  var query = Movie.find({ year: year }).skip((pageNumber - 1) * RESULTS_PER_PAGE)
              .limit(RESULTS_PER_PAGE).sort({ title: 'asc' });
  query.exec(function(err, movies) {
    if(err) return next(err);
    // res.json(movies);
    res.render('movies-by-year', { title: APP_TITLE, movies:movies, year:year, pageNumber:pageNumber, totalPageCount:totalPageCount });
  });
});

module.exports = router;