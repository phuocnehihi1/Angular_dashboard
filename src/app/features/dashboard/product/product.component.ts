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

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  handlerNavite() {
    console.log('addproduct');
    console.log(this.router.navigateByUrl('product/addproduct'));
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
  constructor(private product: ProductServices, private router: Router) {}
  isToggle: boolean = false;

  // Loading Darf
  loadProductDarf() {
    this.data$ = this.product.mapData();
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

  // Loading Product Publish

  // loadProductPublish() {
  //   this.product
  //     .getProductPublish()
  //     .pipe(
  //       map((data) => {
  //         this.data = data;
  //       })
  //     )
  //     .subscribe();
  // }

  //
  toggle() {}

  ngOnInit(): void {
    console.log('input', this.searchText);
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
        console.log('abcd', d);
        this.data$
          .pipe(
            delay(500),
            map((data) => {
              console.log('Lấy dữ liệu từ form', d);
              console.log('Data Observable', data);
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
    this.product.addPNewProduct().subscribe(console.log);
  }
}

//   search(text: string) {
//   if (!text) {
//     this.data;
//   } else {
//     this.data = this.product.getDataArray(text);
//   }
// }
