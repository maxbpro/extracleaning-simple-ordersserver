import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {OrdersComponent} from './orders.component';
import {DetailsComponent} from './details/details.component';


const routes: Routes = [{
  path: '',
  component: OrdersComponent,
  children: [
    {path: 'list', component: ListComponent,},
    {path: 'list/:id', component: DetailsComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }


