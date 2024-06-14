import { UsuarioService } from './Services/usuario.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CarritoService } from './Services/carrito.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce-Angular-17';

  constructor(private carritoservice: CarritoService, private usuarioservice: UsuarioService){

  }

  ngOnInit(){
    this.carritoservice.GetCarrito()
    this.usuarioservice.GetPerfilUsuario()
  }

}
