import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): any {
    let cookieStr = document.cookie;
    var cookFlag = true;
    if(!cookieStr){
      cookFlag = false;
    }
    const dirtyCookies = cookieStr.split(';');
    const cleanCookies = [];

    dirtyCookies.forEach(temp => {
      cleanCookies.push(temp.split('='));
    });

    if(cleanCookies[0][0] === 'Username' && cookFlag){
      const cookieUsername = cleanCookies[0][1];
    }
    if(cleanCookies[1][0] === 'Password' && cookFlag){
      const cookiePassword = cleanCookies[1][1];
    }
    if(cleanCookies[2][0] === 'Token' && cookFlag){
      const cookieToken = cleanCookies[2][1];
    }

    


  }


}
