import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { ProductInterface } from '@core/interfaces/product.interface';

export const PRODUCT_SERVICE_TOKEN = new InjectionToken<ProductService>('product_service_token');

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private readonly apiService: ApiService,
    ) { }

  public getAllProducts(): Observable<ProductInterface[]> {
    return this.apiService.get(`products`);
  }

  public getProductById(id: string): Observable<ProductInterface> {
    return this.apiService.get(`products/${id}`);
  }
}
