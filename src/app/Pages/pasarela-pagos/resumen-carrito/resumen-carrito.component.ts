import { Component } from '@angular/core';
import { CarritoService } from '../../../Services/carrito.service';
import { Carrito } from '../../../Models/Cart/Carrito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-carrito',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './resumen-carrito.component.html',
  styleUrl: './resumen-carrito.component.css'
})
export class ResumenCarritoComponent {

  carro: any = []

constructor(public cart: CarritoService,){
  this.carro = cart.carro();
}

precioTotalUnidCarrito(carro: Carrito) {
  if (carro.producto.precioPromocionEcommerce != 0) {
    return carro.producto.precioPromocionEcommerce * carro.cantidad;
  } else {
    return carro.producto.precioEcommerce * carro.cantidad;
  }
}

precioTotalCarro() {
  let carro = this.cart.carro();

  let tot: number = 0;
  for (let car of carro) {
    tot += this.precioTotalUnidCarrito(car);
  }
  return tot;
}

subTotal() {
  let pre = this.precioTotalCarro();
  let sub1 = pre / 1.18;
  let sub = sub1.toFixed(2);
  let resp = Number(sub);
  return resp;
}

}
