import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  formAddProduct: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    // Khởi tạo form
    this.formAddProduct = this.fb.group({
      nameProduct: '',
      imageProduct: '',
      priceProduct: '',
      selectProduct: '',
      quantityProduct: '',
      sizeProduct: '',
      brandProduct: '',
      materialProduct: '',
      colorBludProduct: false,
      colorRedProduct: false,
      colorPurpleProduct: false,
      colorYellorProduct: false,
      dicriptionProduct: '',
    });
  }

  onSubmit(form: FormGroup): void {
    // Cập nhật dữ liệu qua service
    this.dataService.upDateData(form);

    // Điều hướng đến trang sản phẩm
    this.router.navigate(['dashboard/product']);
  }
}
