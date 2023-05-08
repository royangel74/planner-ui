import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginFormComponent } from './login-form/login-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GuardInterceptor} from "./helper/guard.interceptor";
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GuardInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
