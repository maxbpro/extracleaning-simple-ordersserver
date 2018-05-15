import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiError} from '../models/error/api-error.model';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;

  error: ApiError;
  loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService
  ) { }

  ngOnInit() {

    // reset login status
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log("navigate to " + this.returnUrl);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
