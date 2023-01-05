const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const users = require('../../data/users.json')
const config = require(`../../config.json`)

class AuthenticationController {
  constructor() {
    this.loginSecurity = {
      attempts: {},
      timeouts: {},
    };
    this.authenticated = false;
    // this.router = express.Router();
    // this.router.use(bodyParser.urlencoded({ extended: true }));
    // this.router.post("/login", this.login.bind(this));
    // this.router.post("/logout", this.logout.bind(this));
  }
  

  view(req,res){
    
    res.status(200).render('login', { routeName: req.route.path.replace('/', ' ') })
  }
  login(req, res) {
    const { username, password } = req.body;
    // Parse the JSON data.
    //TODO: better working with
  
    // Check if the username and password match a user in the users list.
    if (!users[username] || users[username].password !== password) {
      // Counter für ungültige Anmeldeversuche sicherstellen und dessen Wert erhöhen
     console.log('not user');
      // Gescheiterten Anmeldeversuch mit dem Status Code 403 (Forbidden) beantworten
      res.send('username or password are not valid!!');
      return;
    }
    
  users[username]
  // res.status(200).json(users[username])
   res.status(200).render('home',{ user: users[username]});
  }

  logout(req, res) {
    this.authenticated = false;
    // Redirect to login page.
    res.redirect("/login");
  }

  signUp() {
    //TODO: signUp
  }
}

module.exports = new AuthenticationController;
