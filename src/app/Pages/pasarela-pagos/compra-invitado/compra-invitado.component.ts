import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceApiService } from '../../../Services/service-api.service';
import { PasarelaInvitadoService } from '../../pasarela-invitado/pasarela-invitado.service';
import { AlertasService } from '../../../Services/alertas.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '../../../Models/Cart/Cargo';
import { CarritoService } from '../../../Services/carrito.service';

@Component({
  selector: 'app-compra-invitado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './compra-invitado.component.html',
  styleUrl: './compra-invitado.component.css'
})
export class CompraInvitadoComponent {

  @Output() enviarRespuesta = new EventEmitter<any>();

  private api = inject(ServiceApiService)
  private alerta = inject(AlertasService)
  private service = inject(PasarelaInvitadoService)
  public cart = inject(CarritoService)

  nombre: string = '';
  telefono: string = ''
  apellidos: string = '';
  documentoidentidad: string = '';
  email: string = '';
  aceptarTerminos: boolean = false
  TipoDocumento_Identidad: string = ""
  statusButton: string = "Ingresar"
  loading: boolean = false

  async RegistrarInvitado() {
    if (!this.nombre || !this.apellidos || !this.documentoidentidad || !this.email || !this.telefono) {
      this.alerta.alertaFallida("Ingrese todos los datos");
      return;
    }
    else if (this.documentoidentidad.length !== 8 || isNaN(Number(this.documentoidentidad))) {
      this.alerta.alertaFallida("El documento de identidad debe tener exactamente 8 dígitos numéricos.");
      return;
    }

    else if (!this.aceptarTerminos) {
      this.alerta.alertaFallida("Debe aceptar los terminos y condiciones");
      return;
    }

    this.statusButton = "Cargando..."
    this.loading = true

    const invitado = {
      fechaRegistro: new Date(),
      nombre: this.nombre,
      apellidos: this.apellidos,
      documentoidentidad: this.documentoidentidad,
      email: this.email,
    }

    const dniValido = await this.validateDni(this.documentoidentidad);
    if (!dniValido) {
      this.statusButton = "Ingresar"
      this.loading = false
      this.alerta.alertaFallida("El documento de identidad no es válido.");
      return;
    } else {
      let metadata: Metadata = {} as Metadata;
      metadata.dni = this.documentoidentidad
      this.service.nombre.set(this.nombre)
      this.service.telefono.set(this.telefono)
      this.service.apellidos.set(this.apellidos)
      this.service.dni.set(metadata)
      this.service.email.set(this.email)
      this.service.imprimir()
      this.statusButton = "Correcto!"
      this.loading = false
      this.service.fechaRegistro.set(invitado.fechaRegistro)
      this.sendResponse()
    }
  }

  sendResponse(){
    this.enviarRespuesta.emit();
  }

  async validateDni(dni: string) {
    try {
      let data = await firstValueFrom(this.api.ObtenerDNI(dni));
      if (data && data.nombre) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

}
