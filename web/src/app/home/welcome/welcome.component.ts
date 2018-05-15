import { Component, OnInit } from '@angular/core';
import {Order} from '../../shared/domain/Order';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../shared/services/order.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CallDialogComponent} from '../call-dialog/call-dialog.component';
import {ProgressDialogComponent} from '../dialogs/progress-dialog/progress-dialog.component';
import {ErrorDialogComponent} from '../dialogs/error-dialog/error-dialog.component';
import {CommonModule, DatePipe} from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public mask = [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  private order: Order;

  phone = new FormControl();
  address = new FormControl();
  date = new FormControl();
  time = new FormControl();

  couch = new FormControl();
  mattress = new FormControl();
  chair = new FormControl();
  armchair = new FormControl();
  cover = new FormControl();

  orderForm: FormGroup;

  totalPrice = 0;

  couchStartPrice = 1000;
  chairStartPrice = 150;
  armchairStartPrice = 500;
  mattressStartPrice = 500;
  coverStartPrice = 1000;

  constructor(private orderService: OrderService,
              private modalService: NgbModal,
              private datePipe: DatePipe) { }

  ngOnInit() {

    this.orderForm = new FormGroup ({
      phone : new FormControl('', Validators.required),
      couch : new FormControl(false),
      mattress : new FormControl(false),
      chair : new FormControl(false),
      armchair : new FormControl(false),
      cover : new FormControl(false),
      address : new FormControl(),
      date : new FormControl(),
      time : new FormControl()
    });
  }

  onFormSubmit() {

    if (this.orderForm.valid) {
      this.order = this.orderForm.value;
      console.log(this.order);

      this.order.date = this.datePipe.transform(this.order.date, 'yyyy-MM-dd\'T\'HH:mm:ss');
      this.order.time = this.datePipe.transform(this.order.time, 'yyyy-MM-dd\'T\'HH:mm:ss');


      const dialogRef = this.modalService.open(ProgressDialogComponent);

      this.orderService.sendSimpleOrder(this.order).subscribe(
        data => {
          this.modalService.open(CallDialogComponent);
        },
        err => this.showError(dialogRef, err),
        () => dialogRef.close()
      );

    }
  }



  showError(dialogRef, error) {
    dialogRef.close();
    this.modalService.open(ErrorDialogComponent);
    console.error(error);
  }

  onSliderChange() {
    this.updatePrice();
  }

  updatePrice() {

    this.totalPrice = 0;
    if(this.orderForm.value.mattress){
      this.totalPrice += this.mattressStartPrice;
    }

    if(this.orderForm.value.cover){
      this.totalPrice += this.coverStartPrice;
    }

    if(this.orderForm.value.chair){
      this.totalPrice += this.chairStartPrice;
    }

    if(this.orderForm.value.armchair){
      this.totalPrice += this.armchairStartPrice;
    }

    if(this.orderForm.value.couch){
      this.totalPrice += this.couchStartPrice;
    }


  }

}
