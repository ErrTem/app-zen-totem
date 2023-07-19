import { Component, EventEmitter, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RemoveAllProductsFromCart } from '@core/ngxs/cart.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-order',
    templateUrl: './delete-order.component.html',
    styleUrls: ['./delete-order.component.sass']
  }
)
export class DeleteOrderComponent {
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<DeleteOrderComponent>
  ) {
  }

  public removeAllProducts() {
    this.deleteClicked.emit()
    this.dialogRef.close();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
