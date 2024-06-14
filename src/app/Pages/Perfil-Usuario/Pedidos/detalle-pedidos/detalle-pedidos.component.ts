import { CommonModule } from '@angular/common';
import { NotaPedido } from '../../../../Models/NotaPedido/NotaPedido';
import { NotaPedidoDetalle } from '../../../../Models/NotaPedido/NotaPedidoDetalle';
import { Router } from '@angular/router';
import { ServiceApiService } from '../../../../Services/service-api.service';
import { firstValueFrom } from 'rxjs';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CargaComponent } from '../../../../global/carga/carga.component';


@Component({
  selector: 'app-detalle-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, CargaComponent],
templateUrl: './detalle-pedidos.component.html',
  styleUrl: './detalle-pedidos.component.css'
})
export class DetallePedidosComponent {

  @Output() evento: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() id: string = ""

  carga = false
  notapedido: NotaPedido = {} as NotaPedido
  numero: number = 0
  fechaCompra: Date = new Date()
  direccion: string = ""
  total: number = 0
  subtotal: number = 0
  costoEnvio: number = 0
  observaciones: string = ''
  detalles: NotaPedidoDetalle[] = []

  constructor(private routes: Router, private api: ServiceApiService){}

  async rellenarDatos(dato: string){
    let resp = await firstValueFrom(this.api.GetNotaPedidoId(dato))
    this.fechaCompra = resp.fecha
    this.direccion = resp.cliente.persona.direccion
    this.observaciones = resp.observacion
    this.total = resp.total
    this.subtotal = resp.subtotal
    this.numero = resp.numero
    this.costoEnvio = 20
    this.detalles = resp.notaPedidoDetalle
  }

  async ngOnInit(){
    if(this.id != ""){
      this.carga = true
      await this.rellenarDatos(this.id)
      this.carga = false
    }
  }

  ngOnDestroy(){
    this.notapedido = {} as NotaPedido
  }

  Back(){
    this.notapedido = {} as NotaPedido
    this.evento.emit(true)
  }

}
