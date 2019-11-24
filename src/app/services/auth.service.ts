import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserModel} from '../registration/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private authToken: string;

  private loggedInUser: {_id: string, name: string, email: string, dob: string } = {
    _id: null,
    name: '',
    email: '',
    dob: ''
  };

  private isLoggedIn = false;

  public getLoggedInStatus() {
    return this.isLoggedIn;
  }

  public setLoggedInStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  public getAuthorizationToken(): string {
    return this.authToken;
  }

  public setAuthorizationToken(token: string) {
    this.authToken = token;
    console.log('--- set token : ', this.authToken);
  }

  public getLoggedInUser(): {_id: string, name: string, email: string, dob: string } {
    return this.loggedInUser;
  }

  public setLoggedInUser(user: UserModel) {
    this.loggedInUser['_id'] = user._id;
    this.loggedInUser['name'] = user.firstName + ' ' + user.lastName;
    this.loggedInUser['email'] = user.email;
    this.loggedInUser['dob '] = user.dob;
  }

  public isAuthenticated(): any {
    // let cookieStr = document.cookie;
    // var cookFlag = true;
    // if(!cookieStr){
    //   cookFlag = false;
    // }
    // const dirtyCookies = cookieStr.split(';');
    // const cleanCookies = [];
    //
    // dirtyCookies.forEach(temp => {
    //   cleanCookies.push(temp.split('='));
    // });
    //
    // if(cleanCookies[0][0] === 'Username' && cookFlag){
    //   const cookieUsername = cleanCookies[0][1];
    // }
    // if(cleanCookies[1][0] === 'Password' && cookFlag){
    //   const cookiePassword = cleanCookies[1][1];
    // }
    // if(cleanCookies[2][0] === 'Token' && cookFlag){
    //   const cookieToken = cleanCookies[2][1];
    // }

    return this.isLoggedIn;
  }


}
