import { EventEmitter, Injectable, signal } from '@angular/core';
import { Producto } from '../Models/Logistica/Producto';
import { Observable, catchError } from 'rxjs';
import { Carrito } from '../Models/Cart/Carrito';
import Swal from 'sweetalert2';
import { ShopServiceService } from './shop-service.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  public activoEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  carro = signal<Carrito[]>([])
  cantidad = signal<number>(0)
  cantidadagregar = signal<number>(1)

  constructor(private shopservice: ShopServiceService) { }

  async GetCantidadItemsCarrito() {
    let carrito = this.carro();
    let cantidad = Array.isArray(carrito) ? carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0) : 0;
    // console.log(cantidad);
    this.cantidad.set(cantidad);
  }


  controlActivoSidebar(activo: boolean){
    this.activoEvent.emit(activo)
  }

  botonAgregarHabilitado: boolean = true;

    DeleteOneCantItemCart(id:string){
    let carrito = this.carro()
    let eliminar = false
      for(let x = 0; x< carrito.length; x++){

      if(carrito[x].producto._id == id){
        carrito[x].cantidad -= 1
        if(carrito[x].cantidad == 0){
          eliminar = true
        }
      }
    }
    if(eliminar == true){
      let array = carrito.filter(p => p.producto._id != id)
      carrito = array
    }
    localStorage.setItem("cart", JSON.stringify(carrito))
    this.GetCarrito()
    this.GetCantidadItemsCarrito()
    this.shopservice.openSnakBar("Se elimino un producto del carrito")

  }

  // SERVICIO DE CANTIDAD PRODUCTO INPUT
  AddCantidadEspecificaProducto(producto: Producto) {
    let carrito = this.carro();
    let val = false;
    let id = producto._id;

    // Verificamos si el producto ya está en el carrito
    let productoEnCarrito = carrito.find(element => element.producto._id == id);

    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad < 10) {
        const cantidadNueva = productoEnCarrito.cantidad + this.cantidadagregar();
        if (cantidadNueva <= 10) {
          productoEnCarrito.cantidad = cantidadNueva;
          val = true;
        } else {
          this.botonAgregarHabilitado = false;
          Swal.fire({
            icon: 'warning',
            title: 'Ups!',
            text: 'Ya no es posible añadir una cantidad adicional a este producto',
            showConfirmButton: false,
            timer: 3000,
          });
          val = true;
        }
      }
    } else {
      // El producto no está en el carrito
      if (this.cantidadagregar() <= 10) {
        let car: Carrito = {} as Carrito;
        car.producto = producto;
        car.cantidad = this.cantidadagregar();
        carrito.push(car);
        val = true;
      } else {
        this.botonAgregarHabilitado = false;
        Swal.fire({
          icon: 'warning',
          title: 'Ups!',
          text: 'Ya no es posible añadir una cantidad adicional a este producto',
          showConfirmButton: false,
          timer: 3000,
        });
        // alert("Ya no puedes agregar más cantidad a este producto.");
        val = true;
      }
    }

    if (val) {
      localStorage.setItem("cart", JSON.stringify(carrito));
      this.GetCarrito()
      // this.shopservice.openSnakBar("Se agrego "+ this.cantidadagregar() + " productos al carrito")

    }
  }







  async GetCarrito(){
    try{
      let demo = localStorage.getItem('cart')

      let car: Carrito[] = JSON.parse(demo || "[]");
      this.carro.set(car)
    }catch(e){
      let demo = localStorage.getItem('cart')

      let car: Carrito[] = JSON.parse(demo || "[]");
      this.carro.set(car)
    }
    this.GetCantidadItemsCarrito()
  }

  async SetCarrito(producto: Producto){
    let carrito = this.carro()
    let val = false

    carrito.forEach(element => {
      if(element.producto._id == producto._id){
        if(element.cantidad < 10){
        element.cantidad += 1
        val = true
        }else{
          this.botonAgregarHabilitado = false;
          Swal.fire({
            icon: 'warning',
            title: 'Ups!',
            text: 'Ya no es posible añadir una cantidad adicional a este producto',
            showConfirmButton: false,
            timer: 3000,
          });
          val = true
        }
      }
    });
    if(val == false){
      let car : Carrito = {} as Carrito
      car.producto = producto
      car.cantidad = 1
      carrito.push(car)
    }
    localStorage.setItem("cart", JSON.stringify(carrito))
    this.GetCarrito()
    // this.shopservice.openSnakBar("Se agrego el producto al carrito")
  }

  async ClearCart(){
    localStorage.setItem('cart', JSON.stringify([]));
    this.GetCarrito()
    this.shopservice.openSnakBar("Se elimino todos los productos del carrito")

  }

  async DeleteCarritoItem(id: string){
    let carrito = this.carro()
    let array = carrito.filter(p => p.producto._id != id)
    localStorage.setItem("cart", JSON.stringify(array))
    this.GetCarrito()
    this.shopservice.openSnakBar("Se elimino el producto del carrito")

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

  precioTotalCarro() {
    let carro = this.carro();

    let tot: number = 0;
    for (let car of carro) {
      tot += this.precioTotalUnidCarrito(car);
    }
    return tot;
  }

  porcentajeDescuentoProducto(producto: Producto){
    if(producto.precioPromocionEcommerce != 0){
      let descuento = ((producto.precioEcommerce - producto.precioPromocionEcommerce) / producto.precioEcommerce) * 100;
      let resp = Math.round(descuento * 100) / 100
      let resp1 = Number(resp.toFixed(0))
      return resp1 - 1
    }else{
      return 0
    }
  }

  confirmarLiquidacion(producto: Producto){
    try{
      if(producto.evento != null){
        if(producto.evento.nombre != null && producto.evento.nombre.trim() != ""){
        return true
        }else{
          return false
        }
      }else{
        return false
      }
    }catch(e){
      return false
    }
  }


}
