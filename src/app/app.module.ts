import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './Sidebar/side-menu/side-menu.component';
import { HeaderMenuComponent } from './Sidebar/header-menu/header-menu.component';
import { AuthenticationModule } from './authentication/authentication.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorInterceptor } from './Services/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
