import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MenuService } from '../menu.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private authService: AuthService, private menuService: MenuService) { }

  ngOnInit() {
    console.log('User: ', this.authService.getLoggedInUser());
    console.log('Token: ', this.authService.getAuthorizationToken());
  }

  async onAddItem(form: NgForm) {
    // event.preventDefault();

    if (form.invalid) {
      console.log('Form is Invalid');
      return;
    } else {
      const name = form.value.name;
      const type = form.value.type;
      const quantity = form.value.quantity;
      const price = form.value.price;
      const link = form.value.link;

      await this.menuService.addMenuItem(name, type, quantity, price, link)
        .subscribe( result => {
          // console.log('Result => ', result);
          console.log('Angular => New Item is Added to Database');
          form.resetForm();
        });
    }

  }

}
