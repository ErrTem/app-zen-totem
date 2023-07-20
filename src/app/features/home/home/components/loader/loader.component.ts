import { Component, OnInit } from '@angular/core';
import { SingleProductComponent } from '@features/home/home/components/single-product/single-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '@core/interfaces/product.interface';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ProductsState } from '@core/ngxs/products.state';

@Component({
  template: ''
})
export class LoaderComponent implements OnInit {
  public productId: number = -1;
  public product: CartItem | null = null;
  public product$!: Observable<CartItem>;

  @Select(ProductsState.getAllProducts) products$!: Observable<CartItem[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id') || '-1');

    this.products$.subscribe((data: CartItem[]) => {
      this.product = data.find(item => item.id === this.productId) || null;
    });

    this.openDialog();
  }

  openDialog(): void {
    if (this.product) {
      const dialogRef = this.dialog.open(SingleProductComponent, {
        width: '500px',
        height: '700px',
        data: this.product
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
    } else console.log('почини меня');
  }
}

