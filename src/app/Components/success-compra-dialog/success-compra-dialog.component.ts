import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { GenerateOvPdfMainComponent } from '../generate-ov-pdf-main/generate-ov-pdf-main.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-compra-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    GenerateOvPdfMainComponent
  ],
  templateUrl: './success-compra-dialog.component.html',
  styleUrl: './success-compra-dialog.component.css'
})
export class SuccessCompraDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public numero: any) { }
}
