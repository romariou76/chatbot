import { FiltrosBusqueda } from './../Models/Helpers/FiltrosBusqueda';
import { Injectable, signal } from '@angular/core';
import { ServiceApiService } from './service-api.service';
import { Producto } from '../Models/Logistica/Producto';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackMessageComponent } from '../Components/snack-message/snack-message.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  busquedafiltro = signal<FiltrosBusqueda>({} as FiltrosBusqueda)

  constructor(private snackBar: MatSnackBar){

  }

  reiniciar(){
    let filtro : FiltrosBusqueda = {
      boolbusqueda : false,
      busqueda: "",
      boolcategoria : false,
      categoria: ""
    }
    this.busquedafiltro.set(filtro)
  }

  openSnakBar(message: string){
    this.snackBar.openFromComponent(SnackMessageComponent, {data: message, duration: 900})
  }

  alertaAgregarCarrito(producto: Producto){
    const imagenUrl = `https://imagenes.upgrade.com.pe/ImagenesEcommerce/${producto.urlimagen || ''}`;
    const contenidoHTML = `
    <p>Producto agregado al carrito:</p>
    <div class="d-flex align-items-center">
    <img src="${imagenUrl}" alt="Imagen del Producto" style="max-width: 30%;">
      <span  style="font-size: 0.7rem !important;" ></span> ${producto.nombre} <br>
    </div>

    `;

    Swal.fire({
      title: 'Producto Agregado al Carrito',
      icon: 'success',
      html: contenidoHTML,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1000
    });
  }


}
