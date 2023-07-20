import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '@core/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarComponent } from '@shared/components';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngxs/store';

import { RouterLink } from '@angular/router';
import { CartService } from '@core/services';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, MatDialogModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent {
  private readonly durationInSeconds = 1000;

  @Input() products!: CartItem[];

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly cartService: CartService,
  ) {
  }

  public decreaseProductQuantity(product: CartItem): void {
    this.cartService.decreaseProductQuantity(product);
    this.showSnackBar('Removed from basket');
  }

  public increaseProductQuantity(product: CartItem): void {
    this.cartService.increaseProductQuantity(product);
    this.showSnackBar('Added to basket');
  }

  public addProductToCart(product: CartItem): void {
    this.cartService.addProductToCart(product);
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
