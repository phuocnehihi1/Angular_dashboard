import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { DataServiceService } from '../data-service.service';

import { ProductServices } from '../product/products.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  // @ViewChild('myCustomeNameProduct', { static: false })
  myCustomNameProduct!: ElementRef;
  item: any;
  numberPattern = '^[0-9]+$';
  formAddProduct: FormGroup;
  id: string | null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private product: ProductServices,
    private activeRouter: ActivatedRoute
  ) {}

  getItem() {
    this.activeRouter.queryParams.subscribe((data) => {
      if (data['data']) {
        const item = JSON.parse(data['data']);
        console.log('revice Item', item.params.id);
      }
    });
  }
  ngOnInit(): void {
    let item = localStorage.getItem('item');
    item ? (this.item = JSON.parse(item)) : {};

    3;

    this.id = this.activeRouter.snapshot.paramMap.get('id') || null;
    console.log('id', this.id);

    // console.log('Đã get item', this.item.product_name);
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
      // fake api call then update form value
      this.checkIdForm();
    }, 1000);
  }

  checkIdForm() {
    console.log(this.item);

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

  onSubmit(form: FormGroup): void {
    if (this.id) {
      localStorage.removeItem('item');
      console.log('Chạy Update Chưa Xử lý xong');
    } else {
      this.product
        .addPNewProduct(
          form.value.nameProduct,
          form.value.imageProduct,
          form.value.priceProduct,
          form.value.selectProduct,
          form.value.quantityProduct,
          form.value.sizeProduct,
          form.value.brandProduct,
          form.value.materialProduct,
          form.value.colorBludProduct,
          form.value.colorRedProduct,
          form.value.colorPurpleProduct,
          form.value.colorYellorProduct,
          form.value.dicriptionProduct
        )
        .subscribe();
    }

    this.router.navigate(['dashboard/product'], {});
  }
}
