import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductInterface } from '@core/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarComponent } from '@shared/components';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import {
  AddProductToBasket,
  DecreaseProductQuantity,
  IncreaseProductQuantity,
  RemoveProductFromBasket
} from '@core/ngxs/basket.actions';
import { BasketState } from '@core/ngxs/basket.state';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, MatDialogModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent {
  private readonly durationInSeconds = 1000;

  @Select(BasketState.getProducts) productCartData$!: Observable<ProductInterface[]>;
  @Input() products!: ProductInterface[];

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly store: Store,
  ) {
  }

  public decreaseProductQuantity(product: ProductInterface): void {
    product.quantity! > 1
      ? this.store.dispatch(new DecreaseProductQuantity(product))
      : this.store.dispatch(new RemoveProductFromBasket(product));
  }

  public increaseProductQuantity(basketItem: ProductInterface): void {
    this.store.dispatch(new IncreaseProductQuantity(basketItem));
  }

  public addProductToCart(product: ProductInterface): void {
    this.productCartData$.pipe(first()).subscribe(res => {
      if (res === undefined || res.length === 0 ) {
        this.store.dispatch(new AddProductToBasket(product));
        return;
      }
    });
  }

  public showSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds,
      panelClass: 'snackbar-awesome',
    });
  }
}
