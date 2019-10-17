

const User = require('../models/user');



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
      console.log("Exception error in getUsers() in UserService. " + LogUtill.getErrorText(e));
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
      console.log("Exception error in findUserByEmailAndPassword() in UserService. " + LogUtill.getErrorText(e));
      next(e);
    }

    return {
      success: success,
      result: result
    }

  }


}
