import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() formGroupName!: string;

  productForm !: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective
  ) {

  }

  ngOnInit(): void {
    this.productForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}
