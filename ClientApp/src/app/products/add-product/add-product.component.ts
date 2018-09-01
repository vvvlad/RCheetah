import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material';
import { AddProductDialogComponent } from './add-product-dialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onCancel() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {data: {
      productName: 'Some Product Name'
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
