import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../../shared/users.service';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../models/user.model';
import {UsersPage} from '../../../models/pages/users.page.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  sub: Subscription;
  loaded: boolean = false;

  items: User[] = [];
  usersPage: UsersPage;

  currentPage: number = 0;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.setPage(0);
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onDisplayInfo(item){

  }

  setPage(pageNumber: number) {
    this.getPage(pageNumber)
  }

  getPage(pageNumber: number){

    this.currentPage = pageNumber;

    this.sub = this.usersService.getUsers(pageNumber, 10).subscribe(page =>{

        this.currentPage = page.currentPage;
        this.usersPage = page;
        let items = page.content;

        this.items = [];

        items.forEach(element =>{
          this.items.push(element);
        });

        this.loaded = true;
        console.log(this.usersPage);
      },
      error => {
        // error - объект ошибки
      });
  }

  onPager(event: number){
    if (!Number.isNaN(event)){
      console.log("Pager event Is: ", event - 1)
      this.getPage(event - 1);
    }

  }
}
