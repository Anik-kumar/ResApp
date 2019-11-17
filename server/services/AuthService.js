const router = require('express').Router();
const jwt = require('jsonwebtoken');
const key = "secretkey";


class AuthService{
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
    const token = jwt.sign({user}, key);

    console.log("Token Created => " , token);
    return token;
  }

  static async getTokenWithExpireTime(user, pass, time) {
    if (time == null || time == undefined) {
      time = 300;
    }
    var user = { user, pass };
    const token = jwt.sign({user}, key, {
      expiresIn: time // in sec.
    });

    console.log("Token Created => " , token);
    return token;
  }
}


module.exports = AuthService;
