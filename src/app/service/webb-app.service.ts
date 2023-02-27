import { Injectable } from '@angular/core';
import { productsModel } from '../models/description.module';
import * as product from '../data/datas.json'

@Injectable({
  providedIn: 'root'
})
export class WebbAppService {

  constructor() { }

  getDataFromID = async (id: number): Promise<productsModel> => {
    let products = [];
    let productByID: productsModel | any;
    products = product as productsModel[];
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        productByID = products[i];
      }
    }
    return productByID;
  }

  getMyCart = async (key: string): Promise<productsModel[]> => {
    const data = JSON.parse(localStorage.getItem(key) as '[]') as productsModel[];
    return data;
  }

  setItem = async (item: productsModel[], key: string): Promise<productsModel> => {
    localStorage.setItem(key, JSON.stringify(item));
    return item[0];
  }

  deleteMyCart = async (index: number, event: Event): Promise<boolean> => {
    event.preventDefault();
    const data = await this.getMyCart('myCart');

    if (data !== null) {
      data.splice(index, 1);
      data;
      this.setItem(data, 'myCart');

      return true;
    } else {
      return false;
    }
  }

}
