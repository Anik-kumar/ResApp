import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { MenuModel } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuModel[] = [];
  private updatedMenuItems = new Subject<MenuModel[]>();

  constructor(public http: HttpClient) { }

  getMenuItems() {
    this.http.get<{ message: string, items: any}>('http://localhost:3000/food/items')
      .pipe(map((postItems) => {
        return postItems.items.map(item => {
          return {
            name: item.name,
            type: item.type,
            price: item.price,
            img: item.img,
            id: item._id
          };
        });
      }))
      .subscribe(items => {
        this.menuItems = items;
        this.updatedMenuItems.next([...this.menuItems]);
    });
  }


}
