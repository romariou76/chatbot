import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../../Services/carrito.service';
import { Carrito } from '../../../Models/Cart/Carrito';
import { ResumenCarritoComponent } from '../resumen-carrito/resumen-carrito.component';

@Component({
  selector: 'app-informacion-carrito',
  standalone: true,
  imports: [
  RouterModule,
    CommonModule,
    ResumenCarritoComponent
  ],
  templateUrl: './informacion-carrito.component.html',
  styleUrl: './informacion-carrito.component.css'
})
export class InformacionCarritoComponent {




constructor(public cart: CarritoService,){
}

precioTotalUnidCarrito(carro: Carrito) {
  if (carro.producto.precioPromocionEcommerce != 0) {
    return carro.producto.precioPromocionEcommerce * carro.cantidad;
  } else {
    return carro.producto.precioEcommerce * carro.cantidad;
  }
}

precioUnitario(carro: Carrito) {
  if (carro.producto.precioPromocionEcommerce != 0) {
    return carro.producto.precioPromocionEcommerce;
  } else {
    return carro.producto.precioEcommerce;
  }
}

eliminarDelCarrito(id: string | null){
  this.cart.DeleteCarritoItem(id || "")
}

ngOnDestroy(){

}

  ngOnInit(){
  }

}
