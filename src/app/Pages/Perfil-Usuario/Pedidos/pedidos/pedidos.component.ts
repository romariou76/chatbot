import { CommonModule } from '@angular/common';
import { NotaPedido } from './../../../../Models/NotaPedido/NotaPedido';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, Input, ViewChild, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DetallePedidosComponent } from '../detalle-pedidos/detalle-pedidos.component';
import { AuthServiceService } from '../../../../Services/auth-service.service';
import { ServiceApiService } from '../../../../Services/service-api.service';
import { FormsModule } from '@angular/forms';
import { CargaComponent } from '../../../../global/carga/carga.component';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DetallePedidosComponent, CargaComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

 @ViewChild(DetallePedidosComponent) detalle!: DetallePedidosComponent
  @Input() idordenventa: string = ""

  cajavacia = "https://imagenes.upgrade.com.pe/Logos/caja-vacia.png"

  ordenesvisualizar: boolean =true
  detallevisualizar: boolean =false
  carga = false

  notapedidobool = signal<boolean>(false)

  notapedidos = signal<NotaPedido[]>([])
  TabSeleccionado = 'mis-datos';

  constructor(private route: ActivatedRoute, private routes: Router, private api: ServiceApiService, private auth: AuthServiceService){

  }

  async ngOnInit(){
    this.carga = true
    this.ordenesvisualizar = true
    if(this.idordenventa != ""){
      this.TabSeleccionado = "mis-pedidos"
      this.detallevisualizar = true
      this.ordenesvisualizar = false
    }else{
      await this.rellenarNotaPedido()
    }
    this.carga = false
  }


  async rellenarNotaPedido(){
    let token = this.auth.GetToken()
    let resp = await firstValueFrom(this.api.GetNotaPedidoIdEcommerce(token.identificador))
    if(resp.length != 0){
      this.notapedidos.set(resp)
      this.notapedidobool.set(true)
    } else {
      this.notapedidos.set(resp)
      this.notapedidobool.set(false)
    }
  }

  Descargas(descarga: boolean){
    if(descarga == true){
      return "SI"
    }else{
      return "NO"
    }
  }

  SeleccionarTab(id: string) {
      this.TabSeleccionado = "mis-pedidos";
      this.detallevisualizar = true
      this.ordenesvisualizar = false
      this.idordenventa = id
      // this.routes.navigate(['/perfil/pedidos/'+tab])
  }

  ngOnDestroy(){
    this.idordenventa = ""
    this.ordenesvisualizar =true
    this.detallevisualizar =false
    this.TabSeleccionado = 'mis-datos';

  }

  Back(even: boolean){
    this.routes.navigate(['/perfil/pedidos'])
    this.TabSeleccionado = 'mis-datos';
    this.idordenventa = ""
    this.ordenesvisualizar =true
    this.detallevisualizar =false
  }



}
