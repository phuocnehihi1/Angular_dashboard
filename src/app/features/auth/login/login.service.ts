import { Injectable } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private user: UserService,
    private router: Router,
    private product: ProductService
  ) {}
  onLogin(email: string, pass: string) {
    this.user.login({ email: email, password: pass }).subscribe({
      next: (res) => {
        console.log('LoginServive:', res.message.message);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Đăng nhập thất bại:', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
