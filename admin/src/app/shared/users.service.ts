import { Injectable } from '@angular/core';
import {BaseService} from './core/base.service';
import {HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {UsersPage} from '../models/pages/users.page.model';

@Injectable()
export class UsersService extends BaseService{

  getUsers(page: number, totalItems: number) : Observable<UsersPage>{

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', totalItems.toString());

    return this.http.get<UsersPage>(environment.serverEndpoint + '/api/v1/users', { params: params })
      .map(response => {

        return this.parseUsersPage(response);

      }).pipe(catchError(err => this.handleError(err)));
  }


}
