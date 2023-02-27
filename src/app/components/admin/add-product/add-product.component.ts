import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from 'src/fireBase';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationServiceService } from 'src/app/service/notification-service.service';
import { Guid } from 'guid-typescript';
import { v4 as uuidv4 } from 'uuid';
import { prodModel } from 'src/app/models/product.module';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private MatDialogRef: MatDialogRef<AddProductComponent>,
    private service: NotificationServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productForm: this.productForm()
    })
  }

  productForm(): FormGroup {
    return this.formBuilder.group({
      prodName: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      quantity: new FormControl(0, Validators.required),
      desc: new FormControl('', Validators.required),
    })
  }

  // pForm() {
  //     this.form = this.formBuilder.group({
  //       productForm: this.productForm
  //     })
  //   }

  get productFormControl() {
    return this.form;
  }


  async addProd() {
    const a = this.form.value.productForm;

    try {

      const docRef = await setDoc(doc(db, "products", uuidv4()), {
        productName: a.prodName,
        price: a.price,
        quantity: a.quantity,
        desc: a.desc

      });

      this.MatDialogRef.close('true');

      this.service.notificationSucess("Product Added Successfully!!!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



}
