import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
