import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cmn: CommonService, private router: Router) { }

  // validator = require('express-validator');

  ngOnInit() {
  }

  onLogin(event: NgForm) {
    // event.preventDefault();
    const user = event.value.username;
    const pass = event.value.password;
    console.log(user, pass);

    if (event.invalid) {
      console.log('Invalid Login Form');
    } else {
      this.cmn.isUserValid(user, pass)
        .subscribe(found => {
          if (found) {
            console.log('User Found');
            // window.location.href = this.endpointApi.HOME_URL;
            // window.location.href = 'http://localhost:4200/home';
            this.router.navigate(['/home']);
            // this.validator.
          } else {
            console.log('User not Found');
            this.router.navigate(['/login']);
            // window.location.href = 'http://localhost:4200/login';
          }
        });
    }

  }

  getUsersDetails() {

  }

}
