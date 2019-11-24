const express = require('express');
const router = express.Router();
const Joi = require('joi');
const userService = require('../services/UserServices');
const LogUtill = require('../Utill/LogUtill');


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


router.get('/abc', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})

router.post('/findone', async (req, res, next) => {
  try {
    console.log('>>> sessionID: ' + req.sessionID);
  } catch (e) {
    console.log(req);
  }

  let results;

  try {
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


router.post('/reg', async (req, res, next) => {
  let result;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let id = req.body._id;
  let email = req.body.email;
  let password = req.body.password;
  let dob = req.body.dob;

  const joiSchema = Joi.object().keys({
    _id: Joi.any(),
    firstName: Joi.string().trim().min(3).max(18).required(),
    lastName: Joi.string().trim().min(3).max(18).required(),
    email: Joi.string().trim().min(6).email().required(),
    password: Joi.string().trim().min(4).required(),
    dob: Joi.string().trim().min(6).required(),
  });

  let isFalse = false;
  Joi.validate(req.body, joiSchema, (err, result) => {
    if (err) {
      console.error(err);
      isFalse = true;
    }
  });

  try {

    if (!isFalse) {
      result = await userService.registerUser(id, firstName, lastName, email, password, dob);

      if (!result.success) {
        console.error('UserRouter => User Registration Error. ', result);
      }
    }

  } catch (e) {
    console.log('Exception error in /api/user/reg Api. ' + e);
    next(e);
  }

  res.status(200).send(result);

});



module.exports = router;
