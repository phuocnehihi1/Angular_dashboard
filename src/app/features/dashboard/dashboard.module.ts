import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, SidebarModule } from '@coreui/angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ProductComponent } from './product/product.component';
import { GridModule } from '@coreui/angular';
import { FormModule } from '@coreui/angular';
import { ProductServices } from './product/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

@NgModule({
  declarations: [AddProductComponent, ProductComponent, UpdateProductComponent],
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
    GridModule,
    FormModule,
    CardModule,
    ReactiveFormsModule,
    FormModule,
  ],
  providers: [IconSetService, ProductServices],
})
export class DashboardModule {}
