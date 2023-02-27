import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import product from '../data/datas.json';
import { productsModel } from '../models/description.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ActivatedRoute, Route } from '@angular/router';
import { WebbAppService } from '../service/webb-app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationServiceService } from '../service/notification-service.service';
// const Products = require('../data/datas.json');
@Component({
  selector: 'app-description-products',
  templateUrl: './description-products.component.html',
  styleUrls: ['./description-products.component.scss']
})

export class DescriptionProductsComponent implements OnInit {
  @ViewChild(DashboardComponent) child?: DashboardComponent;
  products?: productsModel[];
  id: number;
  singleProduct?: productsModel;
  cart: productsModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: WebbAppService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private MatDialogRef: MatDialogRef<DescriptionProductsComponent>,
    private notification: NotificationServiceService

  ) {
    this.id = data
  }

  ngOnInit(): void {
    this.products = product as productsModel[];
    this.getData();
  }

  async getData() {
    this.singleProduct = await this.service.getDataFromID(this.id) as productsModel;
  }
  oldData(oldData: productsModel[]) {
    if (oldData == null) {

    }
  }

  async addNewItem(item: productsModel) {
    let cart = await this.service.getMyCart('myCart') as productsModel[]
    cart.push(item);
    await this.service.setItem(cart, 'myCart');
  }

  async addToCart(data: productsModel | undefined) {
    let cart = [];
    cart = await this.service.getMyCart('myCart') as productsModel[]
    if (cart == null) {
      cart = [];
      cart.push(data as productsModel);
      await this.service.setItem(cart, 'myCart');
      this.notification.notificationSucess("Product added to your Cart successfully");
      this.MatDialogRef.close('true');

    } else {
      const all = cart;
      const one = data as productsModel;
      const a = cart.includes(one);
      if (!cart.some(item => item.id == one.id)) {
        this.addNewItem(one);
        this.MatDialogRef.close('true');
        this.notification.notificationSucess("Product added to your Cart successfully");
      } else {
        alert('Data Already exists');
        this.MatDialogRef.close('true');
      }
    }

  }


}
