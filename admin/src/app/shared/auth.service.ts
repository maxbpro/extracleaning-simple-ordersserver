import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {User} from '../models/user.model';
import {ApiError} from '../models/error/api-error.model';
import {BaseService} from './core/base.service';
import {catchError} from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService extends BaseService{

  login(username: string, password: string) {

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    let body = params.toString();

    return this.http.post<any>(environment.serverEndpoint + '/api/v1/authenticate', body, options)
      .map(result => {
        // login successful if there's a jwt token in the response
        if (result.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
        }

        return result.user;

      }).pipe(catchError(err => this.handleError(err)));
  }





  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.localStorage.clear();
  }

  getUser() : User{

    let userString = localStorage.getItem('user');
    let userJson = JSON.parse(userString);

    let user: User;
    try {
      user = this.convertService.converter.deserialize(userJson, User);
    } catch (e) {
      console.log((<Error>e));
    }

    return user;
  }



  setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

      let apiError: ApiError;
      try {
        apiError = this.convertService.converter.deserialize(error.error.result, ApiError);
      } catch (e) {
        console.log((<Error>e));
      }

      return new ErrorObservable(apiError);
    }

    return new ErrorObservable('Something bad happened; please try again later.');
  };
}
