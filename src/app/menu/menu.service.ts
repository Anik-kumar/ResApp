import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MenuModel } from './menu.model';
import { ApiEndpoints } from '../services/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuModel[] = [];
  private updatedMenuItems = new Subject<MenuModel[]>();

  constructor(public http: HttpClient) { }

  getMenuItems() {
    this.http.get<any[]>( ApiEndpoints.GET_FOODS )
      .pipe(map((postItems) => {
        return postItems.map(item => {
          return {
            name: item.name,
            type: item.type,
            quantity: item.quantity,
            price: item.price,
            img: item.img,
            _id: item._id
          };
        });
      }))
      .subscribe(items => {
        this.menuItems = items;
        console.log(items);
        this.updatedMenuItems.next([...this.menuItems]);
      });
  }

  addMenuItem(uname: string, utype: string, uquantity: string, uprice: number, link: string): Observable<any> {

    const item: MenuModel = { _id: null, name: uname, type: utype, quantity: uquantity, price: uprice, img: link };

    return this.http.post<any>( ApiEndpoints.ADD_FOOD , item);

    // .subscribe(resData => {
    //   item._id = resData.id;
    //   this.menuItems.push(item);
    //   this.updatedMenuItems.next([...this.menuItems]);
    // });
  }

  getItemUpdateListener() {
    return this.updatedMenuItems.asObservable();
  }


  deleteItem(itemId: string) {
    this.http.delete(ApiEndpoints.REMOVE_FOOD + itemId)
      .subscribe(() => {
        const newUpdatedItems = this.menuItems.filter(item => item._id !== itemId);
        this.menuItems = newUpdatedItems;
        this.updatedMenuItems.next([...this.menuItems]);
      });
  }


}
