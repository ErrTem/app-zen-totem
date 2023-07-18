import { Component, Inject, OnInit } from '@angular/core';
import { PRODUCT_SERVICE_TOKEN, ProductService } from '@core/services';
import { ProductInterface } from '@core/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public products: ProductInterface[] = [];

  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN) private readonly productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  public addToBasket(product: ProductInterface) {}
}
