import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private login: LoginService,
    private product: ProductService,
    private use: UserService
  ) {}
  ngOnInit(): void {}

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  clickLogin(signInForm: FormGroup) {
    if (signInForm.valid) {
      const email = signInForm.value.email;
      const password = signInForm.value.password;
      this.login.onLogin(email, password);
    } else {
      console.log('Vui lòng nhập đầy đủ thông tin');
    }
  }
}
