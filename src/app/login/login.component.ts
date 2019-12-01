import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cmn: CommonService, private router: Router, private http: HttpClient) { }
  private token;
  private isLoggedIn;

  // validator = require('express-validator');

  ngOnInit() {
    this.isLoggedIn = this.cmn.checkCookiesOnLogin();
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  onLogin(event: NgForm) {
    // event.preventDefault();
    const user = event.value.username;
    const pass = event.value.password;
    console.log(user, pass);

    if (event.invalid) {
      console.log('Invalid Login Form');
    } else {

      this.cmn.checkUserLogin(user, pass).subscribe(result => {
        if (result) {
          console.log('User Found', result);

          this.router.navigate(['/home']);
        } else {
          console.log('User not Found');
          this.router.navigate(['/login']);
          // window.location.href = 'http://localhost:4200/login';
        }
      });
    }

  }

  // async obc(user, pass) {
  //   const result = await this.cmn.getNewToken(user, pass);
  //   console.log('Login Com 2 => ', result);
  //   return result;
  // }

  // getUsersDetails() {
  //
  // }

}
