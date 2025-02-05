import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscriber, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { API_CONSTANTS } from '../../shared/constants/apiUrl';
import { product } from '../models/interfaces/product';
const token = localStorage.getItem('accessToken');
const id: number = parseInt(localStorage.getItem('id') || '0', 10);

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = API_CONSTANTS.BASE_URL;

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

  addNewProduct(data: {
    product_name: string;
    product_thumb: string;
    product_description: string;
    product_price: number;
    product_quantity: number;
    product_type: string;
    size: string[];
    brand: string;
    material: string;
    color: string[];
    isDraft: boolean;
    isPublished: boolean;
  }): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const id: number = parseInt(localStorage.getItem('id') || '0', 10);
    const headers = new HttpHeaders({
      athorization: token ? token : '',
      'x-client-id': id,
    });

    return this.http
      .post<any>(this.url + '/products/create', data, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => {
            console.log('New Product API Error mess....', error);
          });
        }),
        tap(() => {
          console.log('Add new product accessfully....');
        })
      );
  }
  updateProduct(data: {
    id: number;
    product_name: string;
    product_thumb: string;
    product_description: string;
    product_price: number;
    product_quantity: number;
    product_type: string;
    size: string[];
    brand: string;
    material: string;
    color: string[];
    isDraft: boolean;
    isPublished: boolean;
  }): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const id: number = parseInt(localStorage.getItem('id') || '0', 10);
    const headers = new HttpHeaders({
      athorization: token ? token : '',
      'x-client-id': id,
    });

    return this.http
      .post<any>(this.url + '/products/create', data, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => {
            console.log('Update API Error mess....', error);
          });
        }),
        tap(() => {
          console.log('Update product accessfully....');
        })
      );
  }
}
