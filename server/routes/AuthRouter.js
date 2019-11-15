const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
// router.use(cookieParser());
const authService = require('./../services/AuthService');
const authController = require('./../controllers/AuthController');


router.get('/token', async (req, res, next) => {
  let results;
  // let user = req.body.user;
  let user = req.query.user;
  // let pass = req.body.pass;
  let pass = req.query.pass;
  let resp = res;
  console.log("From AuthRouter => ", user, pass);
  try{
    // res.cookie('Username', 'ANik');
    results = await authService.getToken(user, pass);
    console.log("From AuthRouter => ", results);
    console.log("------------------------");

    // session.uniqueId = user;
    // console.log(user, pass, token);
    // res.cookie('Username', user, { maxAge: 60*10, httpOnly: true });
    // res.cookie('Password', pass, { maxAge: 60*10, httpOnly: true });
    // res.cookie('Token', token, { maxAge: 60*10, httpOnly: true });
    // console.log('Session is set');
    
  } catch (e) {
    next(e);
    console.error(e);
  }

  res.status(200).json({
    message: 'Token Generated',
    token: results
  });

  // return res.status(200).send(results);


});


router.get('/checkcookie', (req, res) => {
  const user = req.signedCookies['Username'];
  const pass = req.signedCookies['Password']
  
  if(user && pass){
    console.log("Cookies exists ", user, pass);
  }
  console.log('username ' + user);
  console.log('password ' + pass);
  console.log('cookies ' , req.cookies);
  console.log('cookies ' , req.signedCookies);
  console.log('session id ' , req.session.id);
  console.log('session uniqueid ' , req.session.uniqueId);
  
  res.status(200).json({
    username: user,
    password: pass,
    cookies1: req.cookies,
    cookies2: req.signedCookies,
    sessionId: req.session.id,
    sessionUId: req.session.uniqueId
  });
});


module.exports = router;
