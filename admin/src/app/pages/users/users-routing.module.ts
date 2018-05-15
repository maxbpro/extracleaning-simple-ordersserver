import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';
import {ListComponent} from './list/list.component';


const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [{
    path: 'list',
    component: ListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

// export const routedComponents = [
//   UsersComponent,
//   ListComponent,
// ];
