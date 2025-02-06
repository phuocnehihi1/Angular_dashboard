import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServices } from '../product/products.service';

@Component({
  selector: 'app-update-product',
  standalone: false,

  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  item: any;
  numberPattern = '^[0-9]+$';
  formAddProduct: FormGroup;
  id: string | null;

  constructor(private fb: FormBuilder, private activeRouter: ActivatedRoute) {}
  ngOnInit(): void {
    let item = localStorage.getItem('item');
    item ? (this.item = JSON.parse(item)) : {};
    this.id = this.activeRouter.snapshot.paramMap.get('id') || null;
    this.formAddProduct = this.fb.group({
      nameProduct: ['', [Validators.required]],
      imageProduct: [''],
      priceProduct: ['', Validators.pattern(this.numberPattern)],
      selectProduct: '',
      quantityProduct: ['', Validators.pattern(this.numberPattern)],
      sizeProduct: [
        '',
        // [
        //   Validators.required,
        //   Validators.maxLength(500),
        //   Validators.minLength(2),
        // ],
      ],
      brandProduct: [
        '',
        [
          Validators.required,
          // Validators.maxLength(500),
          // Validators.minLength(2),
        ],
      ],
      materialProduct: '',
      colorGroup: this.fb.group({
        colorBludProduct: false,
        colorRedProduct: false,
        colorPurpleProduct: false,
        colorYellorProduct: false,
      }),

      dicriptionProduct: [
        '',
        // [
        //   Validators.required,
        //   Validators.maxLength(500),
        //   Validators.minLength(2),
        // ],
      ],
    });
    setTimeout(() => {
      this.checkIdForm();
    }, 1000);
  }

  checkIdForm() {
    if (this.item) {
      this.formAddProduct.patchValue({
        nameProduct: this.item.product_name,
        imageProduct: '',
        priceProduct: this.item.product_price,
        selectProduct: this.item.productType.type_name,
        quantityProduct: this.item.product_quantity,
        dicriptionProduct: this.item.product_description,
      });
    }
  }

  onSubmit(form: FormGroup) {
    localStorage.removeItem('item');
  }
}
