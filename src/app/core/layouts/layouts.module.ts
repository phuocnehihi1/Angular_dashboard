import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { DefaultBodyComponent } from './default-body/default-body.component';
import { SidenavComponent } from '../../features/dashboard/sidenav/sidenav.component';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { SidebarModule } from '@coreui/angular';
import { HeaderModule } from '@coreui/angular';
import { HeaderComponent } from './default-header/header/header.component';
import { NavModule } from '@coreui/angular';
import { DropdownModule } from '@coreui/angular';
import { BreadcrumbModule } from '@coreui/angular';
import { GridModule } from '@coreui/angular';
import { DashboardComponent } from '../../features/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DefaultBodyComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    IconModule,
    SidebarModule,
    HeaderModule,
    GridModule,
    NavModule,
    DropdownModule,
    BreadcrumbModule,
  ],
  providers: [IconSetService],
})
export class LayoutsModule {}
