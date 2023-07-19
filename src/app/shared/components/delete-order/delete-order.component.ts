import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RemoveAllProductsFromCart } from '@core/ngxs/cart.actions';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.sass']
}
)
export class DeleteOrderComponent {

  constructor(private store: Store) { }

  //todo fix in template
  // <div class="buttons_delete" [mat-dialog-close]="true" (click)="removeAllProductsFromCart()">Delete</div>
  removeAllProductsFromCart() {
    this.store.dispatch(new RemoveAllProductsFromCart());
  }
}
