import { ProductService } from '../../../core/services/product.service';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  tap,
  delay,
  // pipe,
  // mergeAll,
  // switchAll,
  // concatAll,
  // fromEvent,
  interval,
  take,
  catchError,
  throwError,
} from 'rxjs';
import {
  addProduct,
  metadata,
  product,
} from '../../../core/models/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  metadata: metadata[] = [];
  ProductPublish: metadata[] = [];
  metadataObservable: Observable<metadata>[] = [];
  constructor(private product: ProductService) {}

  productSubject$ = new BehaviorSubject<product | null>(null);

  // Ham nayf lấy API rồi trề productsubject
  gaftProduct() {
    this.product.getShopDraftAll().subscribe({
      next: (data) => {
        this.productSubject$.next(data);
      },
      error: (err) => {
        console.error('Error fetching draft products:', err);
      },
    });
  }

  // Map Metadata
  mapData(): Observable<metadata[]> {
    return this.product.getShopDraftAll().pipe(
      map((data) => data.message.metadata),
      tap((metadata) => {
        console.log('Dữ liệu đã lấy:', metadata);
        this.metadata = metadata; // Nếu cần gán dữ liệu vào thuộc tính của class
      })
    );
  }

  // Lấy Product publish
  getProductPublish(): Observable<metadata[]> {
    return this.product.getShoppublishAll().pipe(
      map((data) => data.message.metadata),
      tap((metadata) => {
        console.log('Dữ liệu đã lấy:', metadata);
        this.metadata = metadata;
      })
    );
  }

  // Tìm kiếm Danh Sách Darf
  getData(item?: string): Observable<metadata[]> {
    return of(this.metadata).pipe(
      delay(500),
      map((data) => {
        return data.filter((x) => {
          if (!item) return true;
          return x.product_name.toLowerCase().includes(item.toLowerCase());
        });
      })
    );
  }

  // Tìm kiếm Danh Sách publish
  getDataProductPublish(item?: string): Observable<metadata[]> {
    return of(this.ProductPublish).pipe(
      delay(500),
      map((data) => {
        return data.filter((x) => {
          if (!item) return true;
          return x.product_name.toLowerCase().includes(item.toLowerCase());
        });
      })
    );
  }

  getDataArray(item: string): metadata[] {
    return this.metadata.filter((x) => {
      if (!item) return true;
      return x.product_name.toLowerCase().includes(item.toLowerCase());
    });
  }

  // Deleted Service
  deletedProductService(id: number): Observable<metadata> {
    const deletedProduct = this.product.deletedProductAPI({ id });
    return deletedProduct;
  }

  // Add new Service
  addPNewProduct(): Observable<addProduct> {
    return this.product
      .addNewProduct({
        product_name: 'Áo khoác',
        product_thumb: 'sadasdasdsa',
        product_description:
          'Giay Da bong ToniKroos - bền bỉ, thoải mái, ôm chân',
        product_price: 600000,
        product_quantity: 100,
        product_type: 'clothings',
        size: ['32', '31', '22'],
        brand: 'Jeans',
        material: 'Cotton',
        color: ['Đen', 'Trắng', 'RED'],
        isDraft: true,
        isPublished: false,
      })
      .pipe(
        delay(300),
        tap((value) => {
          alert('Thêm' + value + 'Thành công');
        }),
        catchError((error) => {
          return throwError(() => {
            new Error('error messess Add new product: ....', error);
          });
        })
      );
  }
}
