import { Component, OnInit } from '@angular/core';
import { productsModel } from 'src/app/models/description.module';
import product from '../../data/datas.json'
import { Router } from '@angular/router';
import { ContactService } from 'src/app/service/service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProductServices } from 'src/app/service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allProduct: productsModel[] = [];
  isActive: boolean = false;

  constructor(
    private router: Router,
    private service: ProductServices,
    private authFire: AngularFireAuth
  ) { }
  ngOnInit(): void {
    this.allProduct = product as productsModel[];
  }

  description(id: number | undefined, singleData: productsModel) {
    singleData;
    this.router.navigate(['description', id]);
  }

  async signOut() {
    this.authFire.signOut().then(() => {
      this.router.navigate(['']);

    });
  }

}
