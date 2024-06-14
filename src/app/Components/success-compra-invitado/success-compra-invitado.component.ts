import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenerateOvPdfComponent } from '../generate-ov-pdf/generate-ov-pdf.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-success-compra-invitado',
  standalone: true,
  imports: [
    RouterLink,
    GenerateOvPdfComponent

  ],
  templateUrl: './success-compra-invitado.component.html',
  styleUrl: './success-compra-invitado.component.css'
})
export class SuccessCompraInvitadoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public numero: any) { }

}
