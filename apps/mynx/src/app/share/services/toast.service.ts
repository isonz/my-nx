import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public snackBar: MatSnackBar,
  ) {}

  public open(message: string, action: string = 'OK', duration = 4000) {
     this.snackBar.open(message, action, { duration: duration});
  }

}
