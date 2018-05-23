import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ScriptService} from '../../shared/script.service';
import {Order} from "../../shared/domain/Order";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from '../../shared/services/order.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CallDialogComponent} from '../call-dialog/call-dialog.component';
import {ProgressDialogComponent} from '../dialogs/progress-dialog/progress-dialog.component';
import {ErrorDialogComponent} from '../dialogs/error-dialog/error-dialog.component';
import {CommonModule, DatePipe} from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  materials = [
    new Property("Простая ткань", 0, 1),
    new Property("Натуральная кожа", 0, 1.5),
    new Property("Искусственная кожа", 0, 1.3),
    new Property("Искусственная замша", 0, 1),
    new Property("Хлопок и полиэстер", 0, 1),
    new Property("Другие ткани", 0, 1)
  ];

  numbers = [
    new Property("1", 0),
    new Property("2", 0, 1),
    new Property("3", 0, 2),
    new Property("4", 0, 3),
    new Property("5", 0, 4),
  ];

  couchSizes = [
    new Property("2-местный", 1000),
    new Property("3-местный", 1500),
    new Property("4-местный", 2000),
    new Property("2-местный угловой", 2000),
    new Property("3-местный угловой", 2300),
    new Property("большой модульный", 3000)
  ];

  couchMoves = [
    new Property("Нет", 0),
    new Property("Есть", 500, 0, true)
  ];

  mattressSizes = [
    new Property("Односпальный", 500),
    new Property("Полутороспальный", 750),
    new Property("Двуспальный", 990)
  ];

  mattressSides = [
    new Property("1", 0, 1),
    new Property("2", 0, 2),
  ];

  chairTypes = [
    new Property("Без спинки", 150),
    new Property("Со спинкой", 200),
    new Property("Табурет", 150),
    new Property("Компьютерный стул", 250)
  ];

  coverMaterials = [
    new Property("Синтетика", 0, 1),
    new Property("Шерсть", 0, 1.3),
    new Property("Шелк", 0, 5),
    new Property("Вискоза", 0, 5),
    new Property("Хлопок", 0, 2),
    new Property("Акрил", 0, 1)
  ];

  coverTypes = [
    new Property("На дому", 0)
  ];

  coverParams = [
    new Property("До 2 см", 150),
    new Property("Более 2 см", 180),
  ];

  coverWidth = [
    new Property("1 м", 1),
    new Property("2 м", 2),
    new Property("3 м", 3),
    new Property("4 м", 4),
    new Property("5 м", 5),
    new Property("6 м", 6),
    new Property("7 м", 7),
    new Property("8 м", 8)
  ];

  coverHeight = [
    new Property("1 м", 1),
    new Property("2 м", 2),
    new Property("3 м", 3),
    new Property("4 м", 4),
    new Property("5 м", 5),
    new Property("6 м", 6),
    new Property("7 м", 7),
    new Property("8 м", 8)
  ];


  public mask = [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  private order: Order;


  orderForm: FormGroup;

  totalPrice = 0;

  constructor(private orderService: OrderService,
              private modalService: NgbModal,
              private datePipe: DatePipe) {
  }

  ngOnInit() {

    this.orderForm = new FormGroup ({
      phone : new FormControl('', Validators.required),
      address : new FormControl(),
      date : new FormControl(new Date()),


      couchGroup: new FormGroup({
        slider : new FormControl(false),
        size: new FormControl(),
        material: new FormControl(),
        moves: new FormControl(),
        number: new FormControl()
      }),

      mattressGroup: new FormGroup({
        slider : new FormControl(false),
        size: new FormControl(),
        sides: new FormControl(),
        number: new FormControl()
      }),

      coverGroup: new FormGroup({
        slider : new FormControl(false),
        type: new FormControl(),
        height: new FormControl(),
        width: new FormControl(),
        params: new FormControl(),
        material: new FormControl(),
        number: new FormControl()
      }),

      chairGroup: new FormGroup({
        slider : new FormControl(false),
        type: new FormControl(),
        material: new FormControl(),
        number: new FormControl(),
      }),

      armchairGroup: new FormGroup({
        slider : new FormControl(false),
        material: new FormControl(),
        number: new FormControl()
      })

    });
  }

  onSliderChange() {
    try{
      this.updatePrice();
    }catch (e){
      console.log('price calculation issue');
    }
  }


  onSelectionChange(){

    try{
      this.updatePrice();
    }catch (e){
      console.log('price calculation issue');
    }
  }

  updatePrice() {

    this.totalPrice = 0;
    if(this.orderForm.value.mattressGroup.slider){

      let startPrice = this.orderForm.value.mattressGroup.size.startPrice;
      console.log('startPrice' + startPrice);

      //sizes
      let k = this.orderForm.value.mattressGroup.size.k;
      startPrice = this.increasePrice(k, startPrice);

      console.log('startPrice 1' + startPrice);

      //sides
      k = this.orderForm.value.mattressGroup.sides.k;
      startPrice = this.increasePrice(k, startPrice);

      console.log('startPrice 2' + startPrice);

      //numbers
      k = this.orderForm.value.mattressGroup.number.k;
      this.increasePrice(k, startPrice);

      console.log('startPrice 3' + startPrice);
    }



    if(this.orderForm.value.chairGroup.slider){


      let startPrice = this.orderForm.value.chairGroup.type.startPrice;

      //type
      let k = this.orderForm.value.chairGroup.type.k;
      startPrice = this.increasePrice(k, startPrice);

      //material
      k = this.orderForm.value.chairGroup.material.k;
      startPrice = this.increasePrice(k, startPrice);

      //numbers
      k = this.orderForm.value.chairGroup.number.k;
      this.increasePrice(k, startPrice);

    }

    if(this.orderForm.value.armchairGroup.slider){

      let startPrice = 500;

      //material
      let k = this.orderForm.value.armchairGroup.material.k;
      startPrice = this.increasePrice(k, startPrice);

      //numbers
      k = this.orderForm.value.armchairGroup.number.k;
      this.increasePrice(k, startPrice);
    }

    if(this.orderForm.value.couchGroup.slider){

      let startPrice = this.orderForm.value.couchGroup.size.startPrice;

      //size
      let k = this.orderForm.value.couchGroup.size.k;
      startPrice = this.increasePrice(k, startPrice);

      //material
      k = this.orderForm.value.couchGroup.material.k;
      startPrice = this.increasePrice(k, startPrice);

      //moves
      if(this.orderForm.value.couchGroup.moves.adding){
        let adding = this.orderForm.value.couchGroup.moves.startPrice;
        this.totalPrice  = this.totalPrice  + adding;
        startPrice = startPrice + adding;
      }


      //numbers
      k = this.orderForm.value.couchGroup.number.k;
      this.increasePrice(k, startPrice);
    }


    if(this.orderForm.value.coverGroup.slider){

      let startPrice = this.orderForm.value.coverGroup.params.startPrice;

      let w = this.orderForm.value.coverGroup.width.startPrice;
      let h = this.orderForm.value.coverGroup.height.startPrice;

      startPrice = w * h * startPrice;

      //type
      let k = this.orderForm.value.coverGroup.type.k;
      startPrice = this.increasePrice(k, startPrice);

      //material
      k = this.orderForm.value.coverGroup.material.k;
      startPrice = this.increasePrice(k, startPrice);

      //numbers
      k = this.orderForm.value.coverGroup.number.k;
      this.increasePrice(k, startPrice);
    }

    console.log('updatePrice is ' + this.totalPrice);
  }

  increasePrice(k: number, startPrice: number): number{

    if(k == 0)
      return startPrice;


    const newStartPrice = startPrice * (k);

    this.totalPrice  = this.totalPrice  + newStartPrice;

    return newStartPrice;
  }

  onFormSubmit() {

    if (this.orderForm.valid) {
      this.order = this.orderForm.value;
      console.log(this.order);

      this.order.date = this.datePipe.transform(this.order.date, 'yyyy-MM-dd\'T\'HH:mm:ss');


      const dialogRef = this.modalService.open(ProgressDialogComponent);

      this.orderService.sendOrder(this.order).subscribe(
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

}


class Property {

  constructor(public value:string,
              public startPrice: number,
              public k: number = 0,
              public adding: boolean = false){

  }

  public toJSON() {
    return {
      value: this.value
    }
  }
}
