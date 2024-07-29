var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('login', {
    title: 'Login'
  });
});
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});
router.get('/home', function (req, res, next) {
  res.render('home', { title: 'home' });
});
router.get('/distributor-management', function (req, res, next) {
  res.render('distributor-management', { title: 'distributor management' });
});
router.get('/fruit-management', function (req, res, next) {
  res.render('fruit-management', { title: 'fruit management' });
});


module.exports = router;
