import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getCookies();
  }


  getCookies() {
    let cookies = document.cookie;
    console.log('Cookies =>' , cookies);
  }

}
