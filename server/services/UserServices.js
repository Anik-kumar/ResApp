
const User = require('../models/user');
const Joi = require('joi');
const LogUtill = require('../Utill/LogUtill');


module.exports = class UserServices {

  constructor() { }



/*
*
* @return { Promise<{result: *, success: *}>}
*
**/
  static async getUsers() {
    let result, success = true;

    try {
      result = await User.find().exec();
    } catch (e) {
      console.log("Exception error in getUsers() in UserService. " + e);
      // console.log("Exception error in getUsers() in UserService. " + LogUtill.getErrorText(e));
      next(e);
    }

    return {
      success: success,
      result: result
    }
  }

  /*
  *  @param email Email address of the user
  *  @param password Password of the user
  *  @return { Promise<{result: *, success: *}>}
  *
  * */
  static async findUserByEmailAndPassword(email, password) {
    let result, success = true;

    try {
      result = await User.findOne({email: email, password: password}).exec();
    } catch (e) {
      console.log("Exception error in findUserByEmailAndPassword() in UserService. " + e);
      next(e);
    }

    return {
      success: success,
      result: result
    }

  }


  static async registerUser(id, fName, lName, email, pass, dob) {
    let result, success = true;

    try{
      const user = User({
        firstName: fName,
        lastName: lName,
        email: email,
        password: pass,
        dob: dob
      });

      result = await user.save()
        .then(() => {
          console.log('UserService.js => User Is Added');
        })
        .catch((err) => {
          console.error("UserService.js => Error -> ", err);
        });
      
    }catch(e){
      console.error("UserService.js => Exception in /api/user/reg -> ", e);
      next(e);
    }

    return {
      result: result,
      success: success,
    }

  }


}
