import { Component, OnInit } from '@angular/core';
import { ProductServices } from './products.service';
import { metadata, addProduct } from '../../../core/models/interfaces/product';
import {
  debounceTime,
  startWith,
  tap,
  of,
  map,
  switchMap,
  delay,
  forkJoin,
  mergeMap,
  Subject,
  switchAll,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { itemSelect } from './selector';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Observable } from 'rxjs';

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
    this.router.navigate(['/dashboard/addproduct']);
  }

  data: metadata[] = [];
  lenght: number = 0;
  data$: Observable<metadata[]> = new Observable<metadata[]>();
  datapublish: metadata[] = [];
  datapubDarf: metadata[] = [];
  formQuery = new FormControl('');
  loading = true;
  searchText = '';
  itemSelect = itemSelect;
  datapublishs: Observable<unknown[]> = new Observable<unknown[]>();
  onDestroy$: Subject<any> = new Subject<any>();
  constructor(
    private product: ProductServices,
    private router: Router // private newProduct: AddProductComponent
  ) {}
  isToggle: boolean = false;

  // Loading Darf
  loadProductDarf() {
    this.data$ = this.product.mapData();
    this.data$
      .pipe(
        map((data) => {
          this.lenght = data.length;
        })
      )
      .subscribe();
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
  edit(item: metadata) {
    this.router.navigate(['/dashboard/updateproduct', item.id]);
    localStorage.setItem('item', JSON.stringify(item));
  }

  toggle() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadProductDarf();
    }, 1000);

    this.searchProduct();
  }

  searchProduct() {
    this.formQuery.valueChanges
      .pipe(
        startWith(''), // 🟢 Khởi tạo giá trị ban đầu là chuỗi rỗng
        debounceTime(500), // 🟢 Đợi 500ms để tránh gọi API liên tục
        tap(() => {
          this.loading = true;
        }),
        switchMap((value) => {
          // 🟢 Dùng switchMap để hủy request cũ nếu có request mới
          return this.data$.pipe(
            map((data) => {
              if (!value) return data; // 🔥 Trả về mảng rỗng nếu không có giá trị nhập vào
              return data.filter((x) =>
                x.product_name.toLowerCase().includes(value.toLowerCase())
              );
            })
          );
        })
      )
      .subscribe((filteredData) => {
        this.data$ = of(filteredData); // 🟢 Cập nhật data$
        this.loading = false; // 🟢 Tắt loading khi có kết quả
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
  }
}

// this.formQuery.valueChanges
//   .pipe(
//     debounceTime(500),
//     tap(() => {
//       this.loading = true;
//     }),
//     startWith('')
//   )
//   .subscribe((d) => {
//     // console.log('abcd', d);
//     this.data$
//       .pipe(
//         delay(500),
//         map((data) => {
//           // console.log('Lấy dữ liệu từ form', d);
//           // console.log('Data Observable', data);
//           return data.filter((x) => {
//             if (!d) return true;
//             return x.product_name.toLowerCase().includes(d.toLowerCase());
//           });
//         })
//       )
//       .subscribe((result) => {
//         this.data$ = of(result);
//       });
//   });
