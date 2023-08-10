import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SingleProductComponent } from '@features/home/home/components/single-product/single-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '@core/interfaces/product.interface';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ProductsState } from '@core/ngxs/products.state';
import { SnackBarComponent } from '@shared/components';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService, NotificationService } from '@core/services';

@Component({
  template: ''
})
export class LoaderComponent implements OnInit {
  public productId: number = -1;
  public product: CartItem | null = null;
  public product$!: Observable<CartItem>;
  private durationInSeconds = 2000;

  @Select(ProductsState.getAllProducts) products$!: Observable<CartItem[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly cartService: CartService,
    private readonly notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id') || '-1');

    this.products$.subscribe((data: CartItem[]) => {
      this.product = data.find(item => item.id === this.productId) || null;
    });

    this.openDialog();
  }

  //todo bug when open in address bar 'home/id' closes. Need to wait data from server and probably set to home.component/ delete lazy loading
  private openDialog(): void {
    if (this.product) {
      const dialogRef = this.dialog.open(SingleProductComponent, {
        width: '500px',
        height: 'auto',
        data: this.product
      });

      dialogRef.componentInstance.addProductToCart.subscribe((product: CartItem) => {
        this.cartService.addProductToCart(product);
        this.showSnackBar('Added to basket');
      });

      dialogRef.componentInstance.decreaseProductQuantity.subscribe((product: CartItem) => {
        this.cartService.decreaseProductQuantity(product);
        this.showSnackBar('Removed from basket');
      })

      dialogRef.componentInstance.increaseProductQuantity.subscribe((product: CartItem) => {
        this.cartService.increaseProductQuantity(product);
        this.showSnackBar('Added to basket');
      })

      dialogRef.afterClosed().subscribe(() => this.navigateBack());
    } else {
      this.showSnackBar('No such file exists');
      this.navigateBack();
    }
  }

  private navigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  private showSnackBar(message: string): void {
    this.notificationService.showSnackBar(message);
  }
}
