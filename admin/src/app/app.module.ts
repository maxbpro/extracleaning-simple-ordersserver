/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './shared/auth.service';
import {AuthGuard} from './shared/guards/auth.guard';
import {JwtInterceptor} from './shared/helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import {JsonConvertService} from './shared/json-convert.service';
import {BaseService} from './shared/core/base.service';
import {MomentModule} from 'ngx-moment';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import {UsersService} from './shared/users.service';
import {OrdersService} from './shared/orders.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    // { provide: APP_BASE_HREF, useValue: '/' },
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    JsonConvertService,
    BaseService,
    MomentModule,
    UsersService,
    OrdersService
  ],
})
export class AppModule {
}
