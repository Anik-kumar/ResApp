import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationModel } from '../registration/registration.model';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  users: RegistrationModel[] = [];

  constructor(private http: HttpClient, private userApiService: UserApiService) { }


  isUserValid (userAuth: string, passAuth: string) {
    const result = Observable.create((observer: any) => {
      let found = false;
      this.userApiService.getUsers().subscribe(userList => {
        const filteredUser = userList.filter( user => {
          return user.email === userAuth && user.password === passAuth;
        });

        if (filteredUser != null && filteredUser.length > 0) {
          found = true;
        }

        observer.next(found);
      });
    });
    return result;
  }


  /*isUserValid(userAuth: string, passAuth: string) {
    let notFound = true;

    this.http.get<{message: string, users: any}>('http://localhost:3000/api/get/users')
      .subscribe(resData => {
        console.log("ResData message => ", resData.message);
        console.log("ResData users => ", resData.users[0]._id);

        this.users = resData.users;
        // console.log(this.users.length);
        // console.log(this.users[0]);
        // console.log(this.users[1]);
      });
    // console.log("Common service => ", this.users);
    console.log("AA");

    for (let i=0; i<this.users.length; i++){
      console.log(this.users.length);
      console.log(this.users[0]);
      console.log(this.users[1]);
      if(this.users[i].email === userAuth && this.users[i].password === passAuth) {
        notFound = false;
        console.log("User Exists.");
        alert("Login Successful");
      } else {
        notFound = true;
      }
    }
    console.log("AB");

    if(notFound){
      console.log("BB");
      return false;
    } else {
      console.log("BC");
      return true;
    }

    console.log("AC");


  }*/

}
