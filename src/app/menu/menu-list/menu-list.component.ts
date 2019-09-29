import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {

  items = [
    { name: 'Dark Fantasy', type: 'Cookie', img: './../../assets/dark-fantasy-1280x800-cookies-chocolate-hd-8971.jpg'},
    { name: 'Burger', type: 'Fast Food', img: './../../assets/fast_food_burger-wallpaper-1280x800.jpg'},
    { name: 'Orange', type: 'Fruit', img: './../../assets/orange_fruits-wallpaper-1280x800.jpg'},
    { name: 'Calsberg', type: 'Beverage', img: './../../assets/carlsberg-1024x768-beer-glass-4k-11205.jpg'},
    { name: 'Margarita', type: 'Beverage', img: './../../assets/margarita_cocktail-wallpaper-1280x800.jpg'}
  ];

}
