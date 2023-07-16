import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const PRODUCT_SERVICE_TOKEN = new InjectionToken<ProductService>('product_service_token');

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiProductUrl = 'https://fakestoreapi.com/products';

  constructor(
    private readonly http: HttpClient,
    ) { }

  //todo why any?
  public getAllProducts(): Observable<any> {
    return this.http.get(this.apiProductUrl);
  }
}
