import { Component, OnInit, HostListener } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { db } from 'src/fireBase';
import { prodModel } from 'src/app/models/product.module';
import { MatTableDataSource } from '@angular/material/table';
import { ProductServices } from 'src/app/service/product.service';
import { Overlay } from '@angular/cdk/overlay';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { ComponentPortal } from '@angular/cdk/portal';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

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
    this.loading = true;
    await this.service.deletePrds(id);
    this.getAllProducts();
    this.loading = false;
  }







}

