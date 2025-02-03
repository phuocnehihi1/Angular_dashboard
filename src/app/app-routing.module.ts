import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultBodyComponent } from './core/layouts/default-body/default-body.component';
import { userGuard } from './core/guards/user.guard';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Đảm bảo root sẽ điều hướng tới login
  },

  {
    path: 'dashboard',
    component: DefaultBodyComponent,
    data: {
      title: 'Admin Page',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      tittle: 'Login Page',
    },
  },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
