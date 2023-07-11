import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
