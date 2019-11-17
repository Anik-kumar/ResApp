
const Item = require('./../models/item');
const Joi = require('joi');
const LogUtill = require('../Utill/LogUtill');

module.exports = class ItemServices {

  constructor() { }


  static async getAllFoods() {
    let result, success = true;

    try {
      result = await Item.find().exec();
    } catch (e) {
      console.error("Exception error in getAllFoods() from ItemService. " + LogUtill.getErrorText(e));
      next(e);
    }

    return {
      result: result,
      success: success
    }

  }



  static async saveNewItem(params) {

    let result, success = true;
    let item;

    const joiItem = Joi.object().keys({
      _id: Joi.any(),
      name: Joi.string().trim().min(3).max(15).required(),
      type: Joi.string().trim().min(3).max(15).required(),
      quantity: Joi.string().trim().min(3).max(15).required(),
      price: Joi.number().greater(0).min(15).required(),
      img: Joi.string().trim().min(7).required()
    });

    Joi.validate(params, joiItem, (err, result) => {
      if (err) {
        console.error("Joi Validation Error => " + err);

      } else {
        item = Item({
          name: params.name,
          type: params.type,
          quantity: params.quantity,
          price: params.price,
          img: params.img
        });

        /*item.save()
          .then(newItem => {
            console.log("Node => New Item Added to Database");
            res.status(200).json({
              message: "New Item Added to Database",
              id: newItem._id
            });
          });*/
      }
    });

    try {
      result = await item.save().exec();
    } catch (e) {
      console.error("Exception error in saveNewItem() from ItemService. " + LogUtill.getErrorText(e));
      next(e);
    }


    return {
      success: success,
      result: result
    }

  }


  static async deleteItem(id) {
    let result;

    try {
      result = await Item.deleteOne({ _id: id }).exec();
    } catch (e) {
      console.error("Exception error in deleteOne() from ItemService. " + LogUtill.getErrorText(e));
      next(e);
    }

    return {
      result: result
    }

  }


}
