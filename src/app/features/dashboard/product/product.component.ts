import { Component, OnInit } from '@angular/core';
import { ProductServices } from './products.service';
import { metadata } from '../../../core/models/interfaces/product';
import {
  debounceTime,
  Observable,
  startWith,
  tap,
  of,
  map,
  switchMap,
  delay,
  forkJoin,
  mergeMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { itemSelect } from './selector';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  handlerSubmitAddProduct($event: Event) {
    throw new Error('Method not implemented.');
  }
  handleNavigate() {
    console.log('Navigating to addproduct');
    this.router.navigate(['/dashboard/addproduct']);
  }

  data: metadata[] = [];

  data$: Observable<metadata[]> = new Observable<metadata[]>();
  datapublish: metadata[] = [];
  datapubDarf: metadata[] = [];
  formQuery = new FormControl('');
  loading = true;
  searchText = '';
  itemSelect = itemSelect;
  datapublishs: Observable<unknown[]> = new Observable<unknown[]>();
  constructor(
    private product: ProductServices,
    private router: Router, // private newProduct: AddProductComponent
    private dataService: DataServiceService
  ) {}
  isToggle: boolean = false;

  // Loading Darf
  loadProductDarf() {
    this.data$ = this.product.mapData();
    console.log('L');
  }

  // Thực hiện tìm kiếm.

  // Thực hiện xoá
  deleted(metadata: metadata) {
    const res = this.product.deletedProductService(metadata.id);
    res.subscribe((res) => {
      if (res) {
        this.loadProductDarf();
        alert('Xoá sản phẩm thành công'!);
        if (!this.data) {
          console.log('Rỗng');
        }
      }
    });
  }

  // Thực hiện Edit dữ liệu
  edit(metadata: metadata) {
    console.log('Edit', metadata);
  }

  toggle() {}

  ngOnInit(): void {
    this.loadProductDarf();
    this.data$.pipe(
      tap((a) => {
        console.log(
          'Data$',
          a.forEach((x) => {
            x.product_name;
          })
        );
      })
    );
    this.formQuery.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.loading = true;
        }),
        startWith('')
      )
      .subscribe((d) => {
        // console.log('abcd', d);
        this.data$
          .pipe(
            delay(500),
            map((data) => {
              // console.log('Lấy dữ liệu từ form', d);
              // console.log('Data Observable', data);
              return data.filter((x) => {
                if (!d) return true;
                return x.product_name.toLowerCase().includes(d.toLowerCase());
              });
            })
          )
          .subscribe((result) => {
            this.data$ = of(result);
          });
      });

    this.dataService.data.subscribe({
      next: (data) => {
        if (!data.value) {
          console.log('undifine ');
        } else {
          console.log('Đã vào đây product Load ', data.value.arraySizeProduct);
          this.product
            .addPNewProduct(
              data.value.nameProduct,
              data.value.imageProduct,
              data.value.priceProduct,
              data.value.selectProduct,
              data.value.quantityProduct,
              data.value.sizeProduct,
              data.value.brandProduct,
              data.value.materialProduct,
              data.value.colorBludProduct,
              data.value.colorRedProduct,
              data.value.colorPurpleProduct,
              data.value.colorYellorProduct,
              data.value.dicriptionProduct
            )
            .subscribe();
          this.loadProductDarf();
        }
      },
      error: (error) => {
        console.log('mess Error', error);
      },
      complete: () => {
        console.log('complate');
      },
    });
  }
}

//   search(text: string) {
//   if (!text) {
//     this.data;
//   } else {
//     this.data = this.product.getDataArray(text);
//   }
// }

// this.newProduct.currentFormGroup
//   .pipe(
//     map((data) => {
//       return data.value;
//     })
//   )
//   .subscribe({
//     next: (value) => {
//       console.log('Value', value);
//     },
//     error: (error) => {
//       console.log('Mess', error);
//     },
//     complete: () => {
//       console.log('complate');
//     },
//   });
