const express = require('express');
const models = require('../models');
const passport = require('../middlewares/auth');

const router = express.Router();


router.post('/login', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })(req, res);
});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/dashboard', passport.redirectIfNotLoggedIn('./login'), (req, res) => {

});


router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

router.post('/', (req, res) => {
  res.json({
    msg: "Successful POST to '/' route"
  });
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});

module.exports = router;
