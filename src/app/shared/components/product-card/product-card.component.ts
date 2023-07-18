import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductInterface } from '@core/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarComponent } from '@shared/components';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, MatDialogModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent {
  private readonly durationInSeconds = 1000;

  @Input() products!: ProductInterface[];

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {
  }

  public addToBasket(product: ProductInterface) {
  }

  public openProduct(product: ProductInterface): void {
    // const dialogRef = this.dialog
    //   .open(ProductCardComponent, {
    //     width: "600px",
    //     height: "600px",
    //     data: {product},
    //     // disableClose: true
    //   })
  }

  public showSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds,
      panelClass: 'snackbar-awesome',
    });
  }
}
