import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HomeComponent} from "./home.component";
import { CalculatorComponent } from './calculator/calculator.component';
import { AdvantagesComponent } from './advantages/advantages.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { DetailsComponent } from './details/details.component';
import { ContactsComponent } from './contacts/contacts.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {
  MatButtonModule,
  MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ReactiveFormsModule} from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {MobileComponent} from './mobile/mobile.component';

export const DefaultIntl = {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel: 'Add a second',

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel: 'Minus a second',

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel: 'Add a minute',

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel: 'Minus a minute',

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel: 'Add a hour',

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel: 'Minus a hour',

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel: 'Previous month',

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel: 'Next month',

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel: 'Previous year',

  /** A label for the next year button (used by screen readers). */
  nextYearLabel: 'Next year',

  /** A label for the cancel button */
  cancelBtnLabel: 'Отмена',

  /** A label for the set button */
  setBtnLabel: 'Выбрать',
};



@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ]),

    ScrollToModule.forRoot(),

    FlexLayoutModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatInputModule,
    MatButtonModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    ReactiveFormsModule,
    TextMaskModule
  ],
  declarations: [HomeComponent,
    CalculatorComponent,
    AdvantagesComponent,
    NavComponent,
    FooterComponent,
    EquipmentComponent,
    DetailsComponent,
    ContactsComponent,
    WelcomeComponent,
    MobileComponent
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},
    {provide: OwlDateTimeIntl, useValue: DefaultIntl},
    DatePipe
  ],
})
export class HomeModule { }

