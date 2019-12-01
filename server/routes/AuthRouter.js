const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
// router.use(cookieParser());
const authService = require('./../services/AuthService');
const userService = require('../services/UserServices');
const tokenService = require('../services/TokenService');
const LogUtill = require('../Utill/LogUtill');




router.post('/login', async (req, res, next) => {
  let results;

  try{
    let result = await userService.findUserByEmailAndPassword(req.body.email, req.body.password);
    if (result.success) {
      results = result.result;
      if (result.result != null ) {
        let token = await authService.getTokenWithExpireTime(result.result.email, result.result.password, 60*60);
        // res.cookie('access_token', token, {
        //   expires: new Date(Date.now() + 60000) // cookie will be removed after 8 hours
        // });

        res.set({
          'X-Auth-Token': token
        });
      }
    }
  } catch (e) {
    console.log("Exception error in /api/user/findone Api. " + LogUtill.getErrorText(e));
    next(e);
  }
  res.send(results);
  res.status(200);

});

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
  const pass = req.signedCookies['Password'];
  const token = req.headers['x-access-token'] || req.headers['authorization'];


  if(token){
    console.log("Cookies exists token => ", token);
    console.log("Cookies exists token2 => ");
  }
  // console.log('username ' + user);
  // console.log('password ' + pass);
  console.log('token ' + token);
  console.log('token2 ' );
  console.log('cookies ' , req.cookies);
  // console.log('cookies ' , req.signedCookies);
  console.log('session id ' , req.session.id);
  // let obj = req;
  console.log('Response ' , req);
  // console.log('session uniqueid ' , req.session.uniqueId);

  res.status(200).json({
    username: user,
    password: pass,
    token: token,
    cookies1: req.cookies,
    sessionId: req.session.id
  });
});


module.exports = router;
