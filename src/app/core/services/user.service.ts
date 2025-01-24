import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_CONSTANTS } from '../../shared/constants/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = API_CONSTANTS.BASE_URL;
  token: string = '';
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    console.log('Data:', data);
    return this.http.post<any>(this.url + '/shop/login', data).pipe(
      catchError((error) => {
        console.error('Đã xảy ra lỗi:', error);
        return throwError(
          () => new Error('Đã xảy ra lỗi, vui lòng thử lại sau.')
        );
      }),
      tap((res) => {
        this.token = res.message.metadata.tokens.accessToken;
        this.id = res.message.metadata.shop.id;
        this.firstName = res.message.metadata.shop.firstName;
        this.lastName = res.message.metadata.shop.lastName;
        localStorage.setItem('accessToken', this.token);
        localStorage.setItem('id', this.id.toString());
        localStorage.setItem('firstName', this.firstName);
        localStorage.setItem('lastName', this.lastName);
      })
    );
  }

  /* Check Token cho guard*/
  isToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }
  /* Lấy token ra xử lý*/
  getToken() {
    return localStorage.getItem('accessToken');
  }

  /*remove token*/
  removeToken() {
    localStorage.removeItem(this.token);
  }

  getInforLogin() {
    return {
      id: localStorage.getItem('id'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
    };
  }
  removeInforLogin() {
    localStorage.removeItem('id');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  }
}
