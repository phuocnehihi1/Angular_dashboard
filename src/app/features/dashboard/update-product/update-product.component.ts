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

  constructor(
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private proSev: ProductServices,
    private router: Router
  ) {}
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
    let id = !isNaN(Number(this.id)) ? Number(this.id) : NaN;

    const arraySize: String[] = form.value.sizeProduct
      .split(',')
      .map((item: string) => item.trim());
    this.proSev
      .updateProduct({
        id: id,
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
    localStorage.removeItem('item');
    this.router.navigate([''], {});
  }
}
