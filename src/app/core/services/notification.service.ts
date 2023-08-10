import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@shared/components';
import { SNACKBAR_DURATION } from '@shared/constants/snackbar-duration';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private readonly snackBar: MatSnackBar,
  ) {
  }
//todo ad behaviour for errors; styles for success/errors; call messages from here as a constants;
  public showSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: SNACKBAR_DURATION,
      panelClass: 'snackbar-awesome',
      data: {
        message: message
      }
    });
  }
}
