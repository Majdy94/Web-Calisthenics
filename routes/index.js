//routes
const express = require('express')
const router = express.Router();
const AuthenticationController = require('./auth');

router.route('/').get((req,res)=>  res.status(200).render('home', { routeName: req.route.path.replace('/', ' ') }));
router.route('/login').get( AuthenticationController.view).post( AuthenticationController.login);

module.exports = router;