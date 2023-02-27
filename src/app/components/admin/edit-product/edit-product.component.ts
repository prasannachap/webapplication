import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { prodModel } from 'src/app/models/product.module';
import { LoginPageService } from 'src/app/service/login-page.service';
import { ProductServices } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  allProduct: prodModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductServices,
    @Inject(MAT_DIALOG_DATA) public data: string,) { }

  ngOnInit(): void {
    this.pForm();
    this.getAllProducts();

  }

  pForm() {
    this.form = this.formBuilder.group({
      productForm: this.productForm(),
    });


    return this.form;
  }

  get productFormControl() {
    return this.form;
  }

  productForm(): FormGroup {
    return this.formBuilder.group({
      prodName: [, Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      desc: ['', Validators.required],
    })
  }

  async getAllProducts() {
    this.allProduct = await this.service.getAllPrds();

    const a = await this.service.getProductById(this.data)
    debugger;
  }

}
