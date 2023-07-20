import { Component } from '@angular/core';
import { SingleProductComponent } from '@features/home/home/components/single-product/single-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@core/services';

//need to start up and load directly by url
@Component({
  template: ''
})
export class LoaderComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
  ) {
    this.openDialog();
  }

  openDialog(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id') || '1';
    const product = this.productService.getProductById(productId);
    const dialogRef = this.dialog.open(SingleProductComponent, {
      width: '500px',
      height: '700px',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    });
  }
}

