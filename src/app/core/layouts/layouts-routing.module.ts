import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultBodyComponent } from './default-body/default-body.component';
import { userGuard } from '../guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultBodyComponent,
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('../../features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutsRoutingModule {}
