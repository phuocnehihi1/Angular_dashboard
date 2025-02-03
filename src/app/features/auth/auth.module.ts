import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@coreui/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormModule } from '@coreui/angular';
import { CardModule } from '@coreui/angular';
import { LoginService } from './login/login.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    GridModule,
    FormModule,
    CardModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
})
export class AuthModule {}
