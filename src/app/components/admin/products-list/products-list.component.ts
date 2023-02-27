import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { prodModel } from 'src/app/models/product.module';
import { ProductServices } from 'src/app/service/product.service';
import { Overlay } from '@angular/cdk/overlay';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  displayedColumns: string[] = ['id', 'prodName', 'desc', 'price', 'stock', 'image', 'action'];
  data: prodModel[] = []
  tableData: MatTableDataSource<prodModel> = new MatTableDataSource<prodModel>([]);
  loading: boolean = false;

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    private dialog: MatDialog,
    private service: ProductServices,
    private overlay: Overlay,
  ) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  addProduct() {
    const dialog = this.dialog.open(AddProductComponent, {
      width: '700px',
    });
    dialog.afterClosed().subscribe(result => {
      this.getAllProducts()
    });
  }


  async getAllProducts() {

    this.data = await this.service.getAllPrds();
    this.tableData = new MatTableDataSource(this.data);
  }

  enableLoading() {
    return this.overlayRef
  }

  disableLoading() {
    this.overlayRef.detach();
  }

  async deleteProduct(id: string) {
    this.enableLoading();

    await this.service.deletePrds(id);
    this.getAllProducts();
    this.disableLoading();
  }

  editProduct(id: string) {

    const dialog = this.dialog.open(EditProductComponent, {
      width: '700px',

      data: id
    });

    dialog.afterClosed().subscribe(result => {

    });
  }

}


