
module.exports = class LogUtill {
  static getErrorText(e) {
    var errorText = "";
    if (e == null || e == undefined) {
      return errorText;
    }

    if (e instanceof Error) {
      if (e.hasOwnProperty('message')) {
        errorText += " ErrorMessage: " + e.message;
      }

      if (e.hasOwnProperty('stack')) {
        errorText += " ErrorStack: " + e.stack;
      }
    }

    return errorText;
  }

}
