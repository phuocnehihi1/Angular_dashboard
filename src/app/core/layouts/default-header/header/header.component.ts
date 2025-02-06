import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private user: UserService, private router: Router) {}
  username: string = '';
  ngOnInit(): void {
    this.username =
      localStorage.getItem('firstName') +
      ' ' +
      localStorage.getItem('lastName');
  }

  handlerLogout() {
    this.user.removeToken();
    this.user.removeInforLogin();
    localStorage.removeItem('item');
    this.router.navigate(['/login']);
  }
}
