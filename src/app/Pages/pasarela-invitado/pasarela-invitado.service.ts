import { Injectable, signal } from '@angular/core';
import { Metadata } from '../../Models/Cart/Cargo';
import { Departamento } from '../../Models/Ubicacion/Departamento';
import { Distrito } from '../../Models/Ubicacion/Distrito';
import { Provincia } from '../../Models/Ubicacion/Provincia';

@Injectable({
  providedIn: 'root'
})
export class PasarelaInvitadoService {

  nombre = signal("")
  apellidos = signal("")
  dni = signal<Metadata>({} as Metadata)
  email = signal("")

  direccion = signal("")
  telefono = signal("")
  departamento = signal<Departamento>({} as Departamento)
  provincia = signal<Provincia>({} as Provincia)
  distrito = signal<Distrito>({} as Distrito)

  tiendaEntrega = signal("")
  observaciones = signal("")

  // datos irrelevantes
  nombreUsuario = signal("Invitado")
  pass = signal("")
  fechaRegistro = signal(new Date())
  nivel = "1"
  idEcommerce = ""


  numberOrder = signal(0)

  imprimir(){

  }

}
