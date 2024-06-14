import { CommonModule } from '@angular/common';
import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NotaPedido } from '../../../Models/NotaPedido/NotaPedido';
import { NotaPedidoDetalle } from '../../../Models/NotaPedido/NotaPedidoDetalle';


@Component({
  selector: 'app-nota-pedido-detalle',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './nota-pedido-detalle.component.html',
  styleUrl: './nota-pedido-detalle.component.css'
})
export class NotaPedidoDetalleComponent {

  notaPedido : NotaPedido = {} as NotaPedido
  notaPedidoDetalle : NotaPedidoDetalle[] = []
  estado : string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public dial : NotaPedido,
    @Inject(MAT_DIALOG_DATA) public detail : NotaPedidoDetalle,
  ) {
    this.notaPedido = dial,
    this.detail = detail
   }

   detalles(){
      this.notaPedidoDetalle = this.notaPedido.notaPedidoDetalle
      console.log(this.notaPedidoDetalle.length)
   }

   ngOnInit(){
    this.detalles()
  }

  status(){
    if(this.notaPedido.aprobado == true){
      this.estado = 'PEDIDO ENTREGADO'
    }else{
      this.estado = 'PEDIDO EN PROGRESO'
    }
  }

}

