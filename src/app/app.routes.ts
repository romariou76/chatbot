import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ShopComponent } from './Pages/Shop/shop.component';
import { DetalleProductoComponent } from './Pages/Shop/detalle-producto/detalle-producto.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { TerminosCondicionesComponent } from './Pages/Contenido/terminos-condiciones/terminos-condiciones.component';
import { NuestrasTiendasComponent } from './Pages/Contenido/nuestras-tiendas/nuestras-tiendas.component';
import { NuestrosProductosComponent } from './Pages/Contenido/nuestros-productos/nuestros-productos.component';
import { NuestrosServiciosComponent } from './Pages/Contenido/nuestros-servicios/nuestros-servicios.component';
import { ServicioTecnicoComponent } from './Pages/Contenido/servicio-tecnico/servicio-tecnico.component';
import { ComoComprarComponent } from './Pages/Contenido/como-comprar/como-comprar.component';
import { PizarrasComponent } from './Pages/Externo/pizarras/pizarras.component';
import { PasarelaPagosComponent } from './Pages/pasarela-pagos/pasarela-pagos.component';
import { autorizacionGuard } from './Guards/autorizacion.guard';
import { PerfilUsuarioComponent } from './Pages/Perfil-Usuario/perfil-usuario.component';
import { MisDatosComponent } from './Pages/Perfil-Usuario/mis-datos/mis-datos.component';
import { PedidosComponent } from './Pages/Perfil-Usuario/Pedidos/pedidos/pedidos.component';
import { LibroReclamacionesComponent } from './Pages/Contenido/libro-reclamaciones/libro-reclamaciones.component';
import { SolucionesComponent } from './Pages/soluciones/soluciones.component';
import { PasarelaInvitadoComponent } from './Pages/pasarela-invitado/pasarela-invitado.component';
import { TrakingComponent } from './Pages/traking/traking.component';
import { invitadoGuard } from './Guards/invitado.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tienda', component: ShopComponent },
  { path: 'soluciones', component: SolucionesComponent },
  { path: 'tienda/DetailProduct/:id', component: DetalleProductoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pasarelaPagos', component: PasarelaPagosComponent },
  { path: "perfil/:opcion/:id", component: PerfilUsuarioComponent, canActivate: [autorizacionGuard]},
  { path: 'perfil', component: PerfilUsuarioComponent , canActivate: [autorizacionGuard], children: [
    {path: "mis-datos", component: MisDatosComponent},
    {path: "pedidos", component: PedidosComponent }
  ]},
  { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
  { path: 'nuestras-tiendas', component: NuestrasTiendasComponent },
  { path: 'nuestros-productos', component: NuestrosProductosComponent },
  { path: 'claimbook', component: LibroReclamacionesComponent },
  { path: 'nuestros-servicios', component: NuestrosServiciosComponent },
  { path: 'servicio-tecnico', component: ServicioTecnicoComponent },
  { path: 'como-comprar', component: ComoComprarComponent },
  { path: 'nuestros-productos/pizarras-interactivas', component: PizarrasComponent },

  { path: 'compra-invitado', component: PasarelaInvitadoComponent, canActivate: [invitadoGuard] },
  { path: 'seguimiento-compra', component: TrakingComponent},


];
