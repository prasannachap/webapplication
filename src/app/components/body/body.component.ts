import { Component, OnInit, ViewChild } from '@angular/core';
import { productsModel } from 'src/app/models/description.module';
import product from '../../data/datas.json';
import { Router } from '@angular/router';
import { DescriptionProductsComponent } from 'src/app/description-products/description-products.component';
import { MatDialog } from '@angular/material/dialog';
import { WebbAppService } from 'src/app/service/webb-app.service';
import { LoginPageComponent } from 'src/app/login-page/login-page.component';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/fireBase';
import { prodModel } from 'src/app/models/product.module';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  allProduct: productsModel[] = [];
  count: boolean = false;
  data: prodModel[] = []

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: WebbAppService

  ) {

  }
  ngOnInit(): void {
    this.getAllProducts();
    this.allProduct;

  }

  description(id: number | undefined, singleData: productsModel) {
    singleData;
    this.router.navigate(['description', id]);
  }

  productDescription(id: number | undefined) {
    const dialogRef = this.dialog.open(DescriptionProductsComponent, {
      width: '900px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  async like(id: number | undefined, isLiked: any) {
    this.allProduct.map(item => {
      if (item.id == id) {
        item.liked ? (item.liked = false) : (item.liked = true);
      }
      return item;
    });
    // localStorage.setItem('')
  }

  applyFilter(event: any) {
    var data: productsModel[] = [];
    if (event.key !== 'Backspace') {
      this.allProduct.filter(x => {
        if (x.desc?.includes(event.key)) {
          data.push(x);
        }
      });
      this.allProduct = data;
    } else {
      this.allProduct = product as productsModel[];
    }


  }

  async getAllProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list: any[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    this.data = list;

    this.allProduct = this.data as any


  }


}


