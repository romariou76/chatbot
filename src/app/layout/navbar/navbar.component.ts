import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../Pages/Auth/login/login.component';
import { Router, RouterLink } from '@angular/router';
import { CarritoComprasComponent } from '../../Pages/Shop/carrito-compras/carrito-compras.component';
import { CarritoService } from '../../Services/carrito.service';
import { UsuarioService } from '../../Services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../Pages/Auth/login-dialog/login-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RouterLink,
    MatMenuModule,
    MatDividerModule,
    CarritoComprasComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  svg1: string = "assets/svg/svg1.svg"
  svg2: string = "assets/svg/svg2.svg"
  whatsappIconVisible = true;
  isDropdownOpen: boolean = false;
  ContadorCarrito: number = 0
  tokenExiste: boolean = false;
  pass: string = ""
  usuario: string = ""
  NombreUsuario: string = "";
  nombrereal: string  =""
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  constructor(
    public CarritoService: CarritoService,
    public usuarioservice: UsuarioService,
    private dialog: MatDialog,
    private router: Router) { }

  CerrarSesion() {
    localStorage.removeItem("token")
    this.usuarioservice.GetPerfilUsuario()
    if(this.router.url.includes("/perfil" || "compra-invitado"))
    {
      location.reload()
    }
  }

  OpenLogin(size: number){
    let tam = JSON.stringify(size) + "%"
    let dial = this.dialog.open(LoginDialogComponent,{
        width: tam,
        disableClose: false,
        data: 111
      }
    )
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  hideWhatsAppIcon() {
    this.whatsappIconVisible = false;
  }

}
