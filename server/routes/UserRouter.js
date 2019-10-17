const express = require('express');
const router = express.Router();
const userService = require('../services/UserServices');


router.get('/all', async function (req, res, next) {
  let results;
  try {
    let result = await userService.getUsers();
    if (result.success) {
      results = result.result;
    }
  } catch (e) {
    console.log("Exception in /api/user/all Api. " + LogUtill.getErrorText(e));
    next(e);
  }
  res.send(results);
  res.status(200);
});


router.post('/findone', async (req, res, next) => {
  let results;

  try{
    let result = await userService.findUserByEmailAndPassword(req.body.email, req.body.password);
    if (result.success) {
      results = result.result;

    }
  } catch (e) {
    console.log("Exception error in /api/user/findone Api. " + LogUtill.getErrorText(e));
    next(e);
  }
  res.send(results);
  res.status(200);

});


module.exports = router;
