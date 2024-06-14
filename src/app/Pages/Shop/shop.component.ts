import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../Models/Logistica/Producto';
import { firstValueFrom } from 'rxjs';
import { ServiceApiService } from '../../Services/service-api.service';
import { CarritoService } from '../../Services/carrito.service';
import { EsqueletonTiendaComponent } from '../../Components/esqueleton-tienda/esqueleton-tienda.component';
import { EsqueletonBannerComponent } from '../../Components/esqueleton-tienda/esqueleton-banner/esqueleton-banner.component';
import { CategoriasDropdownComponent } from './categorias-dropdown/categorias-dropdown.component';
import { CategoriasProductosComponent } from './categorias-productos/categorias-productos.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Marca } from '../../Models/Logistica/Marca';
import { BarrabusquedaComponent } from '../../global/barrabusqueda/barrabusqueda.component';
import { CambiarVistaProductosComponent } from './cambiar-vista-productos/cambiar-vista-productos.component';
import { FiltrosBarComponent } from './filtros-bar/filtros-bar.component';
import { ShopServiceService } from '../../Services/shop-service.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    EsqueletonTiendaComponent,
    EsqueletonBannerComponent,
    CategoriasDropdownComponent,
    CategoriasProductosComponent,
    BarrabusquedaComponent,
    CambiarVistaProductosComponent,
    FiltrosBarComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  vistasconfig: boolean = true

  VistaEskeleton: string = 'd-block'
  VistaInicial: string = 'd-block col'
  VistaLista: string = 'd-none'
  BotonInicial: string = 'btn btn-upgrade me-2'
  BotonLista: string = 'btn boton-outline-secondary'

  cargandoProductos: boolean = true;
  Baner: string = "https://imagenes.upgrade.com.pe/Logos/baner.webp"
  inicio: number = 0
  productos = signal<Producto[]>([])
  id: string = "";
  totalcarrito: number = 0
  cartItemCount = 0;

  constructor(private api: ServiceApiService, public CarritoServicio: CarritoService, private service: ShopServiceService, private shopservice: ShopServiceService) {
  }

  eventCategoria(value: string) {
    this.inicio = 0
    this.productos.set([])
    this.onArrayProducto()
  }

  precioproducto(producto: Producto) {
    let precio = 0
    if (producto.precioPromocionEcommerce != 0) {
      precio += producto.precioPromocionEcommerce
    } else {
      precio += producto.precioEcommerce
    }
    return precio
  }

  async clicPaginacion(busq: string) {
    if (busq == "siguiente") {
      const cantidadProductos = this.productos().length; // Obtener la cantidad de productos actuales
      // Verificar si hay más productos en la API antes de aumentar this.inicio
      if (cantidadProductos === 20) {
        this.productos.set([])
        this.inicio += 20;
        await this.onArrayProducto();
      } else {
        // Deshabilitar el botón de "siguiente" o tomar otra acción, por ejemplo, mostrar un mensaje
      }
    } else {
      if (this.inicio != 0) {
        this.inicio -= 20;
        this.productos.set([])
        await this.onArrayProducto();
      }
    }
  }

  async rellenarProductos() {
    this.cargandoProductos = true;
    let producto = await firstValueFrom(this.api.GetAllProductoEcommerceLimite(this.inicio))
    this.cargandoProductos = false;
    this.VistaEskeleton = 'd-none'
    this.productos.set(producto)
  }


  cambioCategorias(value: string) {
    this.inicio = 0
    this.onArrayProducto()
  }

  async onArrayProducto() {
    if (this.service.busquedafiltro().boolbusqueda == true || this.service.busquedafiltro().boolcategoria) {
      let resp = await firstValueFrom(this.api.GetBusquedaProductoEcommerceFiltro(this.inicio, this.service.busquedafiltro()))
      this.productos.set(resp)
    } else {
      let resp = await firstValueFrom(this.api.GetAllProductoEcommerceLimite(this.inicio))
      this.productos.set(resp)
    }
  }

  agregarAlCarrito(producto: Producto) {
    this.CarritoServicio.SetCarrito(producto)
    this.shopservice.alertaAgregarCarrito(producto)

  }

  async ngOnInit() {
    this.service.reiniciar()
    this.scrollToTop()
    this.onArrayProducto()
  }

  cambiarClase() {
    this.vistasconfig = false
    this.BotonInicial = 'btn boton-outline-secondary me-2'
    this.BotonLista = 'btn btn-upgrade'
  }

  MarcaProducto(marca: Marca) {
    if (marca.abreviatura != null && marca.abreviatura != "") {
      return marca.abreviatura
    } else {
      return marca.nombre
    }
  }

  restaurarEstado() {
    this.vistasconfig = true
    this.BotonInicial = "btn btn-upgrade me-2"
    this.BotonLista = "btn boton-outline-secondary"
  }

}
