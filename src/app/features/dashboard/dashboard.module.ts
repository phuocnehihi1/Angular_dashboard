import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '@coreui/angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ProductComponent } from './product/product.component';
import { GridModule } from '@coreui/angular';
import { FormModule } from '@coreui/angular';
import { ProductServices } from './product/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [AddProductComponent, ProductComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule, // Dùng CommonModule thay cho BrowserModule
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    SidebarModule,
    IconModule,
    TableModule,
    UtilitiesModule,
    GridModule,
    FormModule,
  ],
  providers: [IconSetService, ProductServices],
})
export class DashboardModule {}
