import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Carrito } from '../../../Models/Cart/Carrito';
import { CarritoService } from '../../../Services/carrito.service';

@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [CommonModule,
  FormsModule,
RouterLink],
  templateUrl: './carrito-compras.component.html',
  styleUrl: './carrito-compras.component.css'
})
export class CarritoComprasComponent {


  constructor(public cart: CarritoService){}

  eliminarDelCarrito(id: string | null){
    // alert("ejecutado")
    this.cart.DeleteCarritoItem(id || "")
    // location.reload()
  }

  IncrementarUnidad(carrito: Carrito){
    this.cart.SetCarrito(carrito.producto)
  }

  ReducirUnidad(carrito: Carrito){
    this.cart.DeleteOneCantItemCart(carrito.producto._id || "")
  }



  precioTotalUnidCarrito(carro: Carrito){
    if(carro.producto.precioPromocionEcommerce != 0){
      return carro.producto.precioPromocionEcommerce * carro.cantidad
    }else{
      return carro.producto.precioEcommerce * carro.cantidad
    }
  }

  precioTotalCarro(){
    let carro = this.cart.carro()
    let tot: number = 0
    for(let car of carro){
      tot += this.precioTotalUnidCarrito(car)
    }
    return tot
  }




  ngOnInit(){

  }


}
