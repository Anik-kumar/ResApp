import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from "../services/common.service";
import { UserApiService } from "../services/user-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cmn: CommonService, private userApiService: UserApiService) { }

  ngOnInit() {
  }

  onLogin(event: NgForm) {
    // event.preventDefault();
    const user = event.value.username;
    const pass = event.value.password;
    console.log(user, pass);

    this.cmn.isUserValid(user, pass)
      .subscribe(found => {
        if (found) {
          console.log("User Found");
        } else {
          console.log('User not Found');
        }
      });

  }

  getUsersDetails() {

  }

}
