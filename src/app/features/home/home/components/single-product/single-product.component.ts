import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItem } from '@core/interfaces/product.interface';

@Component({
  selector: 'app-host',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.sass']
})
export class SingleProductComponent implements OnInit {
  @Output() increaseProductQuantity: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() decreaseProductQuantity: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() addProductToCart: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  public dialogId!: string;
  public product!: CartItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: CartItem,
    private readonly route: ActivatedRoute,
  ) {
  }
  //todo global notification service, and make popup onEvent from here
  ngOnInit(): void {
    this.dialogId = this.route.snapshot.paramMap.get('dialogId') || '';
    this.product = this.data;
  }

  public onAddProductToCart(product: CartItem): void {
    this.addProductToCart.emit(product);
  }

  public onDecreaseProductQuantity(product: CartItem): void {
    this.decreaseProductQuantity.emit(product);
  }

  public onIncreaseProductQuantity(product: CartItem): void {
    this.increaseProductQuantity.emit(product);
  }
}
