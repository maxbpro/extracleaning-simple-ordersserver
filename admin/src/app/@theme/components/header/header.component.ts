import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/auth.service';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Выход' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);

    this.menuService.onItemClick()
      .pipe(filter(({ tag }) => tag === 'my-context-menu'))
      .subscribe(( event ) => {

        if(event.item.title == "Выход"){
          this.logout()
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }


  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
