import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {JsonConvertService} from "../json-convert.service";
import {ApiError} from "../../models/error/api-error.model";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {User} from "../../models/user.model";
import {UsersPage} from '../../models/pages/users.page.model';
import {OrdersPage} from '../../models/pages/orders.page.model';
import {Order} from '../../models/order.model';


@Injectable()
export class BaseService {

  constructor(protected http: HttpClient,
              protected convertService: JsonConvertService) { }

  protected parseUser(result) : User{

    let user: User;
    try {
      user = this.convertService.converter.deserialize(result, User);
    } catch (e) {
      console.log((<Error>e));
    }

    return user;
  }

  protected parseOrder(result) : Order{

    let order: Order;
    try {
      order = this.convertService.converter.deserialize(result, Order);
    } catch (e) {
      console.log((<Error>e));
    }

    return order;
  }

  protected parseUsersPage(result) : UsersPage{

    let page: UsersPage;
    try {
      page = this.convertService.converter.deserialize(result, UsersPage);
    } catch (e) {
      console.log((<Error>e));
    }

    return page;
  }

  protected parseOrdersPage(result) : OrdersPage{

    let page: OrdersPage;
    try {
      page = this.convertService.converter.deserialize(result, OrdersPage);
    } catch (e) {
      console.log((<Error>e));
    }

    return page;
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
