import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserApiService } from '../services/user-api.service';
import { MenuModel } from '../menu/menu.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private userApiService: UserApiService, private menuService: MenuService) { }
  token: string;
  items: MenuModel[] = [];

  ngOnInit() {
    // this.getCookies();
    this.token = this.authService.getAuthorizationToken();
    console.log('User: ', this.authService.getLoggedInUser());
    console.log('Token: ', this.authService.getAuthorizationToken());
    // console.log('Token: ==>', this.token);
    // document.cookie = 'token=' + this.token + '; max-age=60*60';
    this.items = this.menuService.getMenuItems();

    this.userApiService.getUsers().subscribe(res => {
      console.log('Result -> ', res);
    });
  }


  getCookies() {
    const cookies = document.cookie;
    console.log('Cookies =>' , cookies);
  }

}
