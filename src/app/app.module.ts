import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  AlertModule,
  CardModule,
  FormModule,
  GridModule,
} from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from './features/auth/auth.module';
import { LayoutsModule } from './core/layouts/layouts.module';
import { userGuard } from './core/guards/user.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './features/auth/auth-routing.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    LayoutsModule,
    AlertModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,

    // Đang check login
    CommonModule,
    // AuthRoutingModule,
    GridModule,
    FormModule,
    CardModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [provideAnimationsAsync(), userGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
