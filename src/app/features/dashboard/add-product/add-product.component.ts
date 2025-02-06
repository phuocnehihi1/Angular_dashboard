import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { ProductServices } from '../product/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  numberPattern = '^[0-9]+$';
  formAddProduct: FormGroup;

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
  }

  onSubmit(form: FormGroup): void {
    const arraySize: String[] = form.value.sizeProduct
      .split(',')
      .map((item: string) => item.trim());
    this.product
      .addPNewProduct({
        product_name: form.value.nameProduct,
        product_thumb: form.value.imageProduct,
        product_description: form.value.dicriptionProduct,
        product_price: form.value.priceProduct,
        product_quantity: form.value.quantityProduct,
        product_type: 'clothings',
        size: [arraySize.toString()],
        brand: form.value.brandProduct,
        material: form.value.materialProduct,
        color: ['Đen', 'Trắng', 'RED'],
        isDraft: true,
        isPublished: false,
      })
      .subscribe();
    this.router.navigate(['dashboard/product'], {});
  }
}
