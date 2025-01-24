import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductServices } from './product/products.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { userGuard } from '../../core/guards/user.guard';

const routes: Routes = [
  {
    path: '',

    component: DashboardComponent,

    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'addproduct',
        component: AddProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
