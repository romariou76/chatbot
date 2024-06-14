import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom, delay } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../../../../Models/Logistica/Producto';
import { ServiceApiService } from '../../../../Services/service-api.service';
import { CarritoService } from '../../../../Services/carrito.service';

interface Carrusel {
  producto: Producto[]
}

@Component({
  selector: 'app-productos-1',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  templateUrl: './productos-1.component.html',
  styleUrl: './productos-1.component.css'
})
export class Productos1Component {

  @Input() categoria: string = 'NOTEBOOKS';
  inicio = 0;
  productos = signal<Producto[]>([])
  carrusel = signal<Carrusel[]>([])

  constructor(private api: ServiceApiService, public CarritoServicio: CarritoService) {
  }

  async onArrayProductos() {
    try {
      let resp = await firstValueFrom(
        this.api.GetAllProductoEcommerceCategoriaLimite(
          this.inicio,
          this.categoria
        )
      );

      // console.log(resp)
      this.productos.set(resp);
      this.OrdenarProductos()
    } catch (error) {
      // console.error('Error al obtener productos:', error);
    }
  }

  ngOnInit() {
    this.onArrayProductos()
  }

  // ============================

  async OrdenarProductos() {
    for (let x = 0; x < this.productos().length; x++) {
      let productos: Producto[] = []

      let primero = 0
      let segundo = 0
      let tercero = 0
      if (x == this.productos().length - 1) {
        primero = 0
      } else {
        primero = x + 1
      }
      if (primero == this.productos().length - 1) {
        segundo = 0
      } else {
        segundo = primero + 1
      }
      if (segundo == this.productos().length - 1) {
        tercero = 0
      } else {
        tercero = segundo + 1
      }

      productos.push(this.productos()[x])
      productos.push(this.productos()[primero])
      productos.push(this.productos()[segundo])
      productos.push(this.productos()[tercero])
      let carr: Carrusel = {} as Carrusel
      carr.producto = productos
      this.carrusel.set([...this.carrusel(), carr])

    }
  }

}
