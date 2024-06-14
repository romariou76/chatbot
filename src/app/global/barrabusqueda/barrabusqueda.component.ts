import { Component, EventEmitter, Output } from '@angular/core';
import { ShopServiceService } from '../../Services/shop-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barrabusqueda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barrabusqueda.component.html',
  styleUrl: './barrabusqueda.component.css'
})
export class BarrabusquedaComponent {

  busqueda: string = ""
  @Output() event = new EventEmitter<string>()
  constructor(private service: ShopServiceService){

  }

  Busqueda(){
    let fil = this.service.busquedafiltro()
    if(this.busqueda != ""){
      fil.boolbusqueda = true
      fil.busqueda = this.busqueda
      this.service.busquedafiltro.set(fil)
    }else{
      fil.boolbusqueda = false
      fil.busqueda = ""
      this.service.busquedafiltro.set(fil)
    }
    this.event.emit("si")
  }

}
