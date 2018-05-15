import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../../../shared/orders.service';
import {Subscription} from 'rxjs/Subscription';
import {Order} from '../../../models/order.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  id: string;
  sub: Subscription;
  order: Order;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute,
              private ordersService: OrdersService) {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(){

    this.sub = this.ordersService.getOrder(this.id).subscribe(order =>{

        this.order = order;

        this.loaded = true;
        console.log(this.order);
      },
      error => {
        // error - объект ошибки
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
