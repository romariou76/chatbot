import { Injectable, signal } from '@angular/core';
import { Departamento } from '../../Models/Ubicacion/Departamento';
import { Distrito } from '../../Models/Ubicacion/Distrito';
import { Provincia } from '../../Models/Ubicacion/Provincia';

@Injectable({
  providedIn: 'root'
})
export class PasarelaService {

  nombre = signal("")
  dni = signal("")
  email = signal("")
  direccion = signal("")
  telefono = signal("")
  departamento = signal<Departamento>({} as Departamento)
  provincia = signal<Provincia>({} as Provincia)
  distrito = signal<Distrito>({} as Distrito)

  tiendaEntrega = signal("")
  observaciones = signal("")

  // datos irrelevantes
  nombreUsuario = signal("Usuario")
  pass = signal("")
  nivel = "1"


  numberOrder = signal(0)

}
