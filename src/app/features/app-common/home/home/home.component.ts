import { Component, OnInit } from '@angular/core';
import { ProductService } from '@core/services';
import { ProductInterface } from '@core/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public products: ProductInterface[] = [];
  constructor(
    private readonly productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products)=> {
      this.products = products
    });
  }

  addToBasket(product: ProductInterface) {

  }


}
