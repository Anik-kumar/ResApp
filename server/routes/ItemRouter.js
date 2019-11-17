const express = require('express');
const router = express.Router();
const itemService = require('./../services/ItemServices');
const Cookies = require('cookies');
const LogUtill = require('../Utill/LogUtill');


router.get('/foods', async function (req, res, next) {
  let foods;

  try {
    let results = await itemService.getAllFoods();
    if (results.success) {
      foods = results.result;
    }
  } catch (e) {
    console.error("Exception error in /api/item/foods. " + e);
    next(e);
  }

  res.status(200);
  res.send(foods);

});


router.post('/add', async function (req, res) {

  let results;

  try {
    let result = await itemService.saveNewItem(req.body);
    console.log('Item Added');
    if (result.success) {
      results = result.result;
    }
  } catch (e) {
    console.error("Exception error in /api/item/add. " + e);
  }

  res.send(results);
  res.status(200);

});


router.delete('/delete/:id', async function (req, res) {
  console.log(req.params.id);
  let result;

  try {
    result = await itemService.deleteItem(req.params.id);
    if (!result) {
      console.error("Delete Error.");
    }
  } catch (e) {
    console.error("Exception error in /api/item/delete. " + e);
    next(e);
  }

  res.send(result);
  res.status(200);

});



module.exports = router;
