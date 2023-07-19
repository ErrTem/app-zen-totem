import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '@core/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarComponent } from '@shared/components';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import {
  AddProductToCart,
  DecreaseProductQuantity,
  IncreaseProductQuantity,
  RemoveProductFromCart
} from '@core/ngxs/cart.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, MatDialogModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent {
  private readonly durationInSeconds = 1000;

  @Input() products!: CartItem[];

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly store: Store,
  ) {
  }

  public decreaseProductQuantity(product: CartItem): void {
    this.showSnackBar('Removed from basket');
    product.quantity! > 1
      ? this.store.dispatch(new DecreaseProductQuantity(product))
      : this.store.dispatch(new RemoveProductFromCart(product));
  }

  public increaseProductQuantity(product: CartItem): void {
    this.store.dispatch(new IncreaseProductQuantity(product));
    this.showSnackBar('Added to basket');
  }

  public AddProductToCart(product: CartItem): void {
    this.store.dispatch(new AddProductToCart(product));
    this.showSnackBar('Added to basket');
  }

  public showSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds,
      panelClass: 'snackbar-awesome',
      data: {
        message: message
      }
    });
  }
}
