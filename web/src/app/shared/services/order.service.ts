import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";
import {Order} from "../domain/Order";


@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>('/url');
  }

  sendOrder(order: Order) {
    const body = JSON.stringify(order);
    const url = 'http://localhost:8080/orders';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.post( url, body, httpOptions);
  }

  sendSimpleOrder(order: Order) {
    const body = JSON.stringify(order);
    const url = 'http://localhost:8080/orders/simple';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.post( url, body, httpOptions);
  }
}
