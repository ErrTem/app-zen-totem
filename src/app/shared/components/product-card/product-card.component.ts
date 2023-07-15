import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProductInterface } from '@core/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent {
  @Input() products!: ProductInterface[];

  constructor() {}
  //todo add styles to mat-button to change color
  addToBasket(product: ProductInterface) {
    // Implement your logic for adding the product to the basket
  }
}
