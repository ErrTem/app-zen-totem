import { Component, OnInit } from '@angular/core';
import { SingleProductComponent } from '@features/home/home/components/single-product/single-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '@core/interfaces/product.interface';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ProductsState } from '@core/ngxs/products.state';
import { SnackBarComponent } from '@shared/components';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        height: '700px',
        data: this.product
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
    } else {
      this.showSnackBar();
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
  }

  public showSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds,
      panelClass: 'snackbar-awesome',
      data: {
        message: 'No such file exists'
      }
    });
  }
}
