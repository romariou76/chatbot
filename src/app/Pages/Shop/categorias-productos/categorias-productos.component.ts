import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopServiceService } from '../../../Services/shop-service.service';

@Component({
  selector: 'app-categorias-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias-productos.component.html',
  styleUrl: './categorias-productos.component.css'
})
export class CategoriasProductosComponent {

  @Output() event = new EventEmitter<string>()
  @Input() categoria: string = "TODOS"

  constructor(private service: ShopServiceService){

  }

  productosCategoriaSelect(value: string){
    let filt = this.service.busquedafiltro()
    if(value == "TODOS"){
      filt.boolcategoria = false
      filt.categoria = ""
      this.service.busquedafiltro.set(filt)

    }else{
      filt.boolcategoria = true
      filt.categoria = value
      this.service.busquedafiltro.set(filt)

    }
    this.event.emit(value)
    this.categoria = value
  }

}
