import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TarjetaCreditoComponent } from '../../../Components/tarjeta-credito/tarjeta-credito.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-pago',
  standalone: true,
  imports: [MatIconModule, TarjetaCreditoComponent, RouterLink],
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css'
})
export class FormularioPagoComponent {

  @Output() event = new EventEmitter<boolean>()

  RealizarCompra(resp: boolean){
    this.event.emit(resp)
  }
}
