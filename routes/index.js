var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie.js');

const APP_TITLE = "Movie Database App";
const RESULTS_PER_PAGE = 12;

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('index', { title: APP_TITLE });
});

/* GET specific movie */
router.get('/movies/:id', function(req, res, next) {
  var query = Movie.find({ '_id': req.params.id });
  query.exec(function(err, movie) {
    if(err) return next(err);
    // res.json(movie);
    res.render('details', { title: APP_TITLE, movie:movie });
  });
});

module.exports = router;