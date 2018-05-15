import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {UsersRoutingModule} from './users-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule
  ],
  declarations: [UsersComponent, ListComponent]
})
export class UsersModule { }
