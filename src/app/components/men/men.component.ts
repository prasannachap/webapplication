import { Component, OnInit } from '@angular/core';
import product from '../../data/datas.json';
import { productsModel } from '../../models/description.module'
import { DescriptionProductsComponent } from 'src/app/description-products/description-products.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
  product: productsModel[] = [];
  menProduct: productsModel[] = [];
  femaleProduct: productsModel[] = [];
  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.men();
  }
  men() {
    for (let i = 0; i < product.length; i++) {
      if (product[i].gender == 'male') {
        this.menProduct.push(product[i]);
      } else {
        this.femaleProduct.push(product[i])
      }
    }
    this.menProduct;

  }

  productDescription(id: number | undefined) {
    const dialogRef = this.dialog.open(DescriptionProductsComponent, {
      width: '900px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
