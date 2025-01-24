import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultBodyComponent } from './core/layouts/default-body/default-body.component';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Đảm bảo root sẽ điều hướng tới login
  },
  {
    path: 'dashboard',
    // canActivate: [userGuard], // Chặn truy cập nếu chưa đăng nhập
    component: DefaultBodyComponent,
    data: {
      title: 'Admin Page',
    },
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: {
      title: 'Login Page',
    },
  },

  {
    path: '**', // Bắt mọi route không xác định
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
