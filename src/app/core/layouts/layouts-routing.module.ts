import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultBodyComponent } from './default-body/default-body.component';
import { userGuard } from '../guards/user.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutsRoutingModule {}
