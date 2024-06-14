import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Especificacion, EspecificacionesProducto } from '../../../Models/Logistica/EspecificacionesProducto';
import { Producto } from '../../../Models/Logistica/Producto';
import { CarritoService } from '../../../Services/carrito.service';
import { ServiceApiService } from '../../../Services/service-api.service';
import { FormsModule } from '@angular/forms';
import { EsqueletonDetalleProductoComponent } from '../../../Components/esqueleton-detalle-producto/esqueleton-detalle-producto.component';


@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, EsqueletonDetalleProductoComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  list: Especificacion[] = []
  selectedTab = 'caracteristicas';
  especificaciones : EspecificacionesProducto = {} as EspecificacionesProducto;

  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  cargandoDetalleProducto: boolean = true;
  producto: Producto = {} as Producto
  constructor(
    private route: ActivatedRoute,
    private productoEspecificacionesService: ServiceApiService,
    public cart: CarritoService,
    private router: Router
  ) {}

  async GetRouteId() {
    return this.route.snapshot.paramMap.get('id') || '';
  }

  disminuir() {
    let valor = this.cart.cantidadagregar()
    if (valor > 1) {
      valor -= 1;
      this.cart.cantidadagregar.set(valor);
    }
  }

  aumentar() {
    let valor = this.cart.cantidadagregar()
    if (valor < 10) {
      valor += 1;
      this.cart.cantidadagregar.set(valor);
    }
  }

  AumentarCantidad(producto: Producto) {
      this.cart.AddCantidadEspecificaProducto(producto)
  }

  async GetEspecificacionesProducto(producto: Producto) {
    try {
      let id = producto._id;
      let response = await firstValueFrom(this.productoEspecificacionesService.GetEspecificacionesProducto(id || ''));
      this.especificaciones = response;
      this.list = response.especificaciones;
    } catch (error:any) {
      if (error.name === 'NetworkError') {
        alert('No hay conexión a Internet para cargar el producto.');
      } else {
        return
      }
      throw error;
    }
  }

  async ngOnInit() {
    this.scrollToTop();
    this.ObtenerEquiposSimilares()
    let id: string = await this.GetRouteId();
    try {
      this.producto = await firstValueFrom(this.productoEspecificacionesService.GetProductDetails(id));
      this.cargandoDetalleProducto = false;
    } catch (error) {
      alert('Error al cargar detalles del producto. Verifica tu conexión a Internet.');
      this.cargandoDetalleProducto = false;
      this.router.navigate([""])
    }
  }


  // =================================30/11/2023===============================
  productosSimilares: Producto[] = []
  inicio: number = 0

   async ObtenerEquiposSimilares() {

     try {
       // Obtén la lista completa de productos desde el servicio
       const productos = await firstValueFrom(this.productoEspecificacionesService.GetAllProductoEcommerceLimite(this.inicio));

       // Filtra los productos basados en la propiedad 'linea'
       const productosLaptops = productos.filter(producto => producto.linea && producto.linea.nombre === 'NOTEBOOKS');

       // Asigna los productos filtrados a la propiedad 'productos'
       this.productosSimilares = productosLaptops;

      //  console.log(this.productosSimilares);
     } catch (error) {
      //  console.error('Error al obtener los productos similares:', error);
     }

   }

}
