
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

    }

    return {
      result: result,
      success: success
    }

  }



  static async saveNewItem(params) {

    let results, item, success = true;
    // var item;

    const joiItem = Joi.object().keys({

      name: Joi.string().trim().min(3).max(15).required(),
      type: Joi.string().trim().min(3).max(15).required(),
      quantity: Joi.string().trim().min(3).max(15).required(),
      price: Joi.number().greater(0).min(15).required(),
      img: Joi.string().trim().min(7).required()
    });

    Joi.validate(params, joiItem, async (err, result) => {
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


        try {
          results = await item.save();
        } catch (e) {
          console.error("Exception error in saveNewItem() from ItemService. " + LogUtill.getErrorText(e));

        }

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

    return {
      success: success,
      result: results
    }


  }


  static async deleteItem(id) {
    let result;

    try {
      // console.log('ID -> ', id);
      result = await Item.deleteOne({ _id: id }).exec();
    } catch (e) {
      console.error("Exception error in deleteOne() from ItemService. " + LogUtill.getErrorText(e));

    }

    return {
      result: result
    }

  }


}
