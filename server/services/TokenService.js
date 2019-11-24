let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = async (req, res, next) => {
  console.log('---- checkToken ---');
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  console.log('---- Token --- ' + token);
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      console.log('---- decoded ---- ', decoded);
      console.log('---- error ---- ', err);
      if (err) {
        res.status(401);
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

let generateToken = async (data, time) => {
  if (time == null || time == undefined) {
    time = config.tokenExpiryTime;
  }

  const token = jwt.sign({user}, key, {
    expiresIn: time // in sec.
  });

  return token;
}

module.exports = {
  checkToken: checkToken,
  generateToken: generateToken
}

