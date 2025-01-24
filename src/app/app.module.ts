import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http'; //

import { FormatDraftPipe } from './shared/piges/format-draft.pipe';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { AuthModule } from './features/auth/auth.module';
import { LayoutsModule } from './core/layouts/layouts.module';

@NgModule({
  declarations: [AppComponent, FormatDraftPipe],
  imports: [
    BrowserModule,
    DashboardModule,
    AuthModule,
    AlertModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
