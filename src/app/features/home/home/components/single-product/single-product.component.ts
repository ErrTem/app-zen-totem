import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItem } from '@core/interfaces/product.interface';

@Component({
  selector: 'app-host',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.sass']
})
export class SingleProductComponent implements OnInit {
  public dialogId!: string;
  public product!: CartItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: CartItem,
    private readonly route: ActivatedRoute,
  ) {
  }
  //todo fix css

  ngOnInit(): void {
    this.dialogId = this.route.snapshot.paramMap.get('dialogId') || '';
    this.product = this.data;
  }
  //todo add @Output to handle add to cart
}
