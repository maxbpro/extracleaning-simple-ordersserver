import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule
} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {OrderService} from "./shared/services/order.service";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routing";
import {ScriptService} from "./shared/script.service";
import {CallDialogComponent} from "./home/call-dialog/call-dialog.component";
import {ProgressDialogComponent} from './home/dialogs/progress-dialog/progress-dialog.component';
import {ErrorDialogComponent} from './home/dialogs/error-dialog/error-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CallDialogComponent,
    ProgressDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [OrderService, ScriptService],
  bootstrap: [AppComponent],
  entryComponents: [CallDialogComponent, ProgressDialogComponent, ErrorDialogComponent]
})
export class AppModule { }
