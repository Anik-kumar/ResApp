import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private userApiService: UserApiService) { }

  ngOnInit() {
    this.getCookies();
    console.log('User: ', this.authService.getLoggedInUser());
    console.log('Token: ', this.authService.getAuthorizationToken());
    this.userApiService.getUsers().subscribe(res => {
      console.log('Result -> ', res);
    });
  }


  getCookies() {
    let cookies = document.cookie;
    console.log('Cookies =>' , cookies);
  }

}
