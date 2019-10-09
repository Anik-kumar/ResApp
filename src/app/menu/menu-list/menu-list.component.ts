import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import { MenuService } from '../menu.service';
import {MenuModel} from '../menu.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit{

  items: MenuModel[] = [];
  private itemSub: Subscription; /* subscription is used for updating items list */

  constructor(private menuService: MenuService) { }



  ngOnInit() {
    this.menuService.getMenuItems();
    this.itemSub = this.menuService.getItemUpdateListener()
      .subscribe( (items: MenuModel[]) => {
        this.items = items;
      });
  }

  onDelete(itemId: string) {
    // console.log(itemId + "=====");
    this.menuService.deleteItem(itemId);
  }


}
