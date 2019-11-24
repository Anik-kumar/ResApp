const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('./config.js');


class AuthService {
  constructor () { }

  static async postLogin (req, res, next)  {
    // res.render('')
    res.send('AAAA');
    console.log("Post login")
  };

  static async getLogin (req, res, next) {
    console.log("Get login");
  }

  static async getToken(user, pass) {
    var user = { user, pass };
    const token = jwt.sign({user}, config.secret);

    console.log("Token Created => " , token);
    return token;
  }

  static async getTokenWithExpireTime(user, pass, time) {
    if (time == null || time == undefined) {
      time = config.tokenExpiryTime;
    }
    var user = { user, pass };
    const token = jwt.sign({user}, config.secret, {
      expiresIn: time // in sec.
    });

    console.log("Token Created => " , token);
    return token;
  }
}


module.exports = AuthService;
