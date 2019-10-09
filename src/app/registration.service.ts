import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerNewUser(fName, lName, email, pass, pass2, day, month, year) {
    // console.log( 'Reg Service =>' , fName, lName, email, pass, pass2, day, month, year);
    if (pass === pass2) {
      const user = {
        id: null,
        firstName: fName,
        lastName: lName,
        email: email,
        pass: pass,
        dob: month + ' ' + day + ', ' + year
      };
      // console.log(user);
      this.http.post<{id: string}>('http://localhost:3000/api/reg/user', user);
    } else {
      console.log('Password does not Match');
    }

    //


  }
}
