import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { ProductInterface } from '@core/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private readonly apiService: ApiService,
  ) {
  }

}
