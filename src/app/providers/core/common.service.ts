import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(content: string) {
    this.snackBar.open(content, 'Close', {
      duration: 1000,
    });
  }

}
