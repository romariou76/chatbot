import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ServiceApiService } from '../../Services/service-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotaPedidoDetalleComponent } from './nota-pedido-detalle/nota-pedido-detalle.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotaPedido } from '../../Models/NotaPedido/NotaPedido';
import { FormsModule } from '@angular/forms';
import { NotaPedidoDetalle } from '../../Models/NotaPedido/NotaPedidoDetalle';

@Component({
  selector: 'app-traking',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './traking.component.html',
  styleUrl: './traking.component.css'
})
export class TrakingComponent {

  numero : number = 0
  codigoNum : string = '';
  notaPedido : NotaPedido = {} as NotaPedido;
  notaDetalle : NotaPedidoDetalle = {} as NotaPedidoDetalle;

  consultaTracking = new FormGroup({
    codigo : new FormControl('' , Validators.required)
  })

  constructor(
    public dialog: MatDialog,
    private serviceApi : ServiceApiService,
  ) {}

  openDialog(): void {
    
  }

  async getData(){
    try{
      await this.serviceApi.GetConsultaNotaPedido(this.codigoNum ).subscribe(
        notaPedido => {
          this.notaPedido = notaPedido;
          const producto = notaPedido.notaPedidoDetalle


          console.log(notaPedido,producto)
          this.openDetail(notaPedido,this.notaDetalle)
        },
        
      )
    }catch(error){

    }
  }

  async consulta() {
   
  }
  
  openDetail( data2 : NotaPedido, data3 : NotaPedidoDetalle){
    console.log(this.notaPedido)

    this.dialog.open(NotaPedidoDetalleComponent,{
        data: data2,
        
      });
  }

  ngOnInit(){
  }
  
}


