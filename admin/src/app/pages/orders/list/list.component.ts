import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Order} from '../../../models/order.model';
import {OrdersPage} from '../../../models/pages/orders.page.model';
import {OrdersService} from '../../../shared/orders.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  sub: Subscription;
  loaded: boolean = false;

  items: Order[] = [];
  ordersPage: OrdersPage;

  currentPage: number = 0;

  constructor(private ordersService: OrdersService,
              private router: Router,) {
  }

  ngOnInit() {
    this.setPage(0);
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onDisplayInfo(item){
    console.log("navigate to " + item.id);
    this.router.navigate(['orders', 'list', item.id]);
  }

  setPage(pageNumber: number) {
    this.getPage(pageNumber)
  }

  getPage(pageNumber: number){

    this.currentPage = pageNumber;

    this.sub = this.ordersService.getOrders(pageNumber, 10).subscribe(page =>{

        this.currentPage = page.currentPage;
        this.ordersPage = page;
        let items = page.content;

        this.items = [];

        items.forEach(element =>{
          this.items.push(element);
        });

        this.loaded = true;
        console.log(this.ordersPage);
      },
      error => {
        // error - объект ошибки
      });
  }

  onPager(event: number){
    if (!Number.isNaN(event)){
      this.getPage(event - 1);
    }

  }
}
