import { Injectable } from '@angular/core';
import {BaseService} from './core/base.service';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {OrdersPage} from '../models/pages/orders.page.model';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Order} from '../models/order.model';

@Injectable()
export class OrdersService extends BaseService{

  getOrders(page: number, totalItems: number) : Observable<OrdersPage>{

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', totalItems.toString());

    return this.http.get<OrdersPage>(environment.serverEndpoint + '/api/v1/orders', { params: params })
      .map(response => {

        return this.parseOrdersPage(response);

      }).pipe(catchError(err => this.handleError(err)));
  }


  getOrder(id: string) : Observable<Order>{

    return this.http.get<OrdersPage>(environment.serverEndpoint + '/api/v1/orders/' + id )
      .map(response => {

        return this.parseOrder(response);

      }).pipe(catchError(err => this.handleError(err)));
  }
}
