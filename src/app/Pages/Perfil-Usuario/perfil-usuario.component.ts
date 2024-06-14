import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthServiceService } from './../../Services/auth-service.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { MiContrasenaComponent } from './mi-contrasena/mi-contrasena.component';
import { MisDireccionesComponent } from './mis-direcciones/mis-direcciones.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { FormsModule } from '@angular/forms';
import { PedidosComponent } from './Pedidos/pedidos/pedidos.component';
import { CargaComponent } from '../../global/carga/carga.component';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MisDatosComponent,
    PedidosComponent,
    MiContrasenaComponent,
    MisDireccionesComponent,
    RouterLink,
    ContactanosComponent,
    RouterOutlet,
    FormsModule,
    CargaComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

  idorden: string = ""
  ruta= ""
  TabSeleccionado = 'mis-datos';
  ProfileImgDefault: string = 'https://imagenes.upgrade.com.pe/Logos/Perfil/profile_default-ffbcee96.png';
  NombreUsuario: string = '';
  Nombre: string = '';
  IdUsuario: string = '';
  Dni: string = '';
  Email: string = '';
  Telefono: string = '';
  Direccion: string = '';
  Distrito: string = '';
  Provincia: string = '';
  Departamento: string = '';
  Pais: string = '';
  carga: boolean = false

  constructor(
    private AuthService: AuthServiceService,
    private route: ActivatedRoute,
    private routes: Router
  ) {}

  GetRouteId() {
    return this.route.snapshot.paramMap.get('id') || '';
  }

  GetRouteOpcion() {
    if(this.routes.url.includes("pedidos")){
      return "pedidos"
    }else if(this.routes.url.includes("mis-datos")){
      return "mis-datos"
    }else{
      return ""
    }
  }

  GetToken(){
    return this.AuthService.GetToken()
  }

  async Redireccion() {}

  SeleccionarTab(tab: string) {
      this.TabSeleccionado = tab;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  CerrarSesion(){
    localStorage.setItem("token", "false")
    location.reload()
  }

  ngAfterViewInit(){
    this.TabSeleccionado = this.GetRouteOpcion();
  }

  async ngOnInit() {
    this.carga = true
    this.ruta = this.GetRouteOpcion();
    let tok = this.GetToken()
    this.NombreUsuario = tok.nombreusuario
    let op = this.GetRouteOpcion();
    this.TabSeleccionado = op;
    this.scrollToTop();
    this.carga = false
  }

}
