
module.exports = class AuthController{


  static hasCookie() {

    const dirtyCookies = document.cookie;
    const clearedCookies = dirtyCookies.split(';');

    const tempCookies = [];

    clearedCookies.forEach(cookie => {
      tempCookies.push(cookie.split('='));
    });

    const cookies = tempCookies.filter(cookie => {
      console.log(cookie);
    });

    return document.cookie;
  }

}