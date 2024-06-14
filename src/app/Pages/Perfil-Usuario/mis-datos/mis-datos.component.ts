import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ServiceApiService } from '../../../Services/service-api.service';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CargaComponent } from '../../../global/carga/carga.component';
import { UsuarioService } from '../../../Services/usuario.service';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../../../Models/Users/Cliente';

@Component({
  selector: 'app-mis-datos',
  standalone: true,
  imports: [CommonModule,
   FormsModule, RouterLink, CargaComponent],
  templateUrl: './mis-datos.component.html',
  styleUrl: './mis-datos.component.css'
})
export class MisDatosComponent {

  Cliente: Cliente = {} as Cliente
  NombreUsuario: string = '';
  carga: boolean = false
  Nombre: string = '';
  IdUsuario: string = '';
  Dni: string = '';
  Fecha: Date = new Date()
  Email: string = '';
  Telefono: string = '';
  Direccion: string = '';
  Distrito: string = '';
  Provincia: string = '';
  Departamento: string = '';
  Pais: string = '';
  TipoDocumentoIdentidad: string = ''
  constructor(private api: ServiceApiService, private dialog: MatDialog,){

  }

  async getData() {
    try {
      await this.api.GetPerfilData().subscribe(
        cliente => {
          this.Cliente = cliente
          this.Nombre = cliente.persona.nombre;
          this.TipoDocumentoIdentidad = cliente.persona.tipoDocumentoIdentidad.abreviatura;
          this.Dni = cliente.persona.documentoIdentidad;
          this.Email = cliente.persona.email;
          this.Telefono = cliente.persona.telefono;
          this.Fecha = cliente.fechaRegistro;
          this.Direccion = cliente.persona.direccion;
          this.Distrito = cliente.persona.distrito.nombre;
          this.Provincia = cliente.persona.distrito.provincia.nombre;
          this.Departamento = cliente.persona.distrito.provincia.departamento.nombre;
          this.Pais = cliente.persona.distrito.provincia.departamento.pais.nombre;
        },
        error => {
          // console.error('Error al obtener los datos del perfil:', error);
          throw error;
        }
      );
    } catch (error) {
      // console.error('Error en getData:', error);
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(EditarPerfilComponent, {
      height: 'auto',
      width: '600px',
      data: {
        componentePadre: this.Cliente
      }
    });
  }

  async ngOnInit(){
    this.carga = true
    await this.getData()
    this.carga = false
  }

}
