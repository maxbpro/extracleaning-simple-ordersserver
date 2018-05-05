import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss']
})
export class CallDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('constructor');
  }

  onNoClick(): void {
    console.log('onNoClick');
    this.dialogRef.close();
  }


  ngOnInit() {
    console.log('ngOnInit');
  }


}
