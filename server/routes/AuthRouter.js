const express = require('express');
const router = express.Router();
const authService = require('./../services/AuthService');
const authController = require('./../controllers/AuthController');


router.get('/token', async (req, res) => {
  let results;
  // let user = req.body.user;
  let user = req.query.user;
  // let pass = req.body.pass;
  let pass = req.query.pass;
  
  console.log("From AuthRouter => ", user, pass);
  try{
    results = await authService.getToken(user, pass);
    console.log("From AuthRouter => ", results);
    console.log("------------------------");
    
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
// router.post('/login', authService.);




module.exports = router;
