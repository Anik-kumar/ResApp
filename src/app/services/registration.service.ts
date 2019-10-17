import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegistrationModel } from '../registration/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerNewUser(fName: string, lName: string, email: string, pass: string, pass2: string, day: string, month: string, year: string) {
    // console.log( 'Reg Service =>' , fName, lName, email, pass, pass2, day, month, year);

    if (pass === pass2) {
      const user: RegistrationModel = {
        id: null,
        firstName: fName,
        lastName: lName,
        email: email,
        password: pass,
        dob: month + ' ' + day + ', ' + year
      };
      // console.log(user);
      try {
        this.http.post<{id: string}>('http://localhost:3000/api/reg/user', user)
          .subscribe(resData => {
            console.log('idid => ' + resData.id);
          });
      } catch (e) {
        console.log('error error => ' + e);
      }

    } else {
      console.log('Password does not Match');
    }

    //


  }
}
