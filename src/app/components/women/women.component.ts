import { Component, OnInit } from '@angular/core';
import product from '../../data/datas.json'
import { MatDialog } from '@angular/material/dialog';
import { productsModel } from 'src/app/models/description.module';
import { DescriptionProductsComponent } from 'src/app/description-products/description-products.component';
@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {
  womenProduct: productsModel[] = []
  constructor(
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.women();
  }

  women() {
    for (let i = 0; i < product.length; i++) {
      if (product[i].gender == 'women') {
        this.womenProduct.push(product[i]);
      }
    }

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

