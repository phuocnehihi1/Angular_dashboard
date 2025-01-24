import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultBodyComponent } from './core/layouts/default-body/default-body.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductComponent } from './features/dashboard/product/product.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DefaultBodyComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

//   {
//     path: 'products',
//     data: {
//       title: 'Product',
//     },
//     children: [
//       {
//         path: '',
//         loadChildren: () =>
//           import('./features/dashboard/dashboard.module').then(
//             (m) => m.DashboardModule
//           ),
//       },
//     ],
//   },
