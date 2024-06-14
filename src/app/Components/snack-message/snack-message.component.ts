import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-message',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatIconModule],
  templateUrl: './snack-message.component.html',
  styleUrl: './snack-message.component.css'
})
export class SnackMessageComponent {
  message = signal<string>("")

  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: string){
    this.message.set(data)
  }




}
