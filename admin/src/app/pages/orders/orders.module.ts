import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ListComponent } from './list/list.component';
import {OrdersRoutingModule} from './orders-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    ThemeModule,
    OrdersRoutingModule
  ],
  declarations: [OrdersComponent, ListComponent, DetailsComponent]
})
export class OrdersModule { }
