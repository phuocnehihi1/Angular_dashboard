import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscriber, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { API_CONSTANTS } from '../../shared/constants/apiUrl';
import {
  addProduct,
  product,
  updateProduct,
} from '../models/interfaces/product';
const token = localStorage.getItem('accessToken');
const id: number = parseInt(localStorage.getItem('id') || '0', 10);

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = API_CONSTANTS.BASE_URL;
  dataAdd: any;
  constructor(private http: HttpClient, private user: UserService) {}

  _token = localStorage.getItem('accessToken');
  _id: number = parseInt(localStorage.getItem('id') || '0', 10);

  // Lấy Data Draft All
  getShopDraftAll(): Observable<product> {
    const token = localStorage.getItem('accessToken');
    const id: number = parseInt(localStorage.getItem('id') || '0', 10);
    const headers = new HttpHeaders({
      athorization: token ? token : '',
      'x-client-id': id,
    });
    return this.http
      .get<product>(this.url + '/products/shop/draft-all', { headers })
      .pipe(
        catchError((er) => {
          return throwError(
            () => new Error('Get Product Service API error mess ')
          );
        })
      );
  }

  // Lấy Data publish All
  getShoppublishAll(): Observable<product> {
    const token = localStorage.getItem('accessToken');
    const id: number = parseInt(localStorage.getItem('id') || '0', 10);
    const headers = new HttpHeaders({
      athorization: token ? token : '',
      'x-client-id': id,
    });

    return this.http
      .get<product>(this.url + '/products/shop/publish-all', { headers })
      .pipe(
        catchError((er) => {
          return throwError(
            () => new Error('Get Product Service API error mess ')
          );
        })
      );
  }

  // Hàm deleted
  deletedProductAPI(data: { id: number }): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const id: number = parseInt(localStorage.getItem('id') || '0', 10);
    const headers = new HttpHeaders({
      athorization: token ? token : '',
      'x-client-id': id,
    });
    return this.http
      .post<any>(this.url + '/products/delete', data, { headers })
      .pipe(
        tap(() => {}),
        catchError((error) => {
          return throwError(() => {});
        }),
        tap(() => {
          console.log('Deleted accessfully');
          console.log(headers);
        })
      );
  }

  // Add Product

  addNewProduct(data: addProduct): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      athorization: token ? token : '',
      'x-client-id': 1,
    });

    return this.http
      .post<any>((this.url + '/products/create').trim(), data, {
        headers,
      })
      .pipe(
        tap(() => {
          console.log('New Product asseccfully');
        }),
        catchError((error) => {
          return throwError(() => {
            console.log('New Product API Error mess....', error);
          });
        })
      );
  }

  // Update Product
  updateProduct(data: updateProduct): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      athorization: token ? token : '',
      'x-client-id': 1,
    });

    return this.http
      .post<any>((this.url + '/products/create').trim(), data, {
        headers,
      })
      .pipe(
        tap(() => {
          console.log('Update Product asseccfully');
        }),
        catchError((error) => {
          return throwError(() => {
            console.log('New Product API Error mess....', error);
          });
        })
      );
  }
}
