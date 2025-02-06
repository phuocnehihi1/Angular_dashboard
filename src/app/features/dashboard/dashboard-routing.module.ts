import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { userGuard } from '../../core/guards/user.guard';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'product', component: ProductComponent },
      { path: 'addproduct', component: AddProductComponent },
      {
        path: 'updateproduct/:id',
        component: UpdateProductComponent,
        title: 'Update Form',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
