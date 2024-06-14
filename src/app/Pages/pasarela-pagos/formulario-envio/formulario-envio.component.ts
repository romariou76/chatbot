import { Departamento } from './../../../Models/Ubicacion/Departamento';
import { UsuarioService } from './../../../Services/usuario.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, signal } from '@angular/core';
import { ResumenCarritoComponent } from '../resumen-carrito/resumen-carrito.component';
import { SelectDepartamentoComponent } from '../../../global/select-departamento/select-departamento.component';
import { SelectProvinciaComponent } from '../../../global/select-provincia/select-provincia.component';
import { SelectDistritoComponent } from '../../../global/select-distrito/select-distrito.component';
import { FormsModule } from '@angular/forms';
import { Provincia } from '../../../Models/Ubicacion/Provincia';
import { Distrito } from '../../../Models/Ubicacion/Distrito';
import { Cliente } from '../../../Models/Users/Cliente';
import { ServiceApiService } from '../../../Services/service-api.service';
import Swal from 'sweetalert2';
import { AlertasService } from '../../../Services/alertas.service';
import { PasarelaService } from '../pasarela.service';
import { CarritoService } from '../../../Services/carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-envio',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ResumenCarritoComponent,
    SelectDepartamentoComponent,
    SelectProvinciaComponent,
    SelectDistritoComponent,
    RouterLink
  ],
  templateUrl: './formulario-envio.component.html',
  styleUrl: './formulario-envio.component.css'
})
export class FormularioEnvioComponent {

    private UsuarioService = inject(UsuarioService)
    private api = inject(ServiceApiService)
    private alertas = inject(AlertasService)
    private service = inject(PasarelaService)
    public cart = inject(CarritoService)


  @ViewChild(SelectDepartamentoComponent) selectdepartamento!: SelectDepartamentoComponent
  @ViewChild(SelectProvinciaComponent) selectprovincia!: SelectProvinciaComponent
  @ViewChild(SelectDistritoComponent) selectdistrito!: SelectDistritoComponent

  @Output() event = new EventEmitter<Cliente>()
  @Output() event2 = new EventEmitter<string>()

  nombre: string = '';
  dni: string = '';
  telefono: string = '';
  correo: string = '';
  direccion: string = '';

  @Output() idevent: EventEmitter<any> = new EventEmitter<any>();
  @Output() idpro: EventEmitter<any> = new EventEmitter<any>();

  // nuevosEventos
  @Output() enviarDepartamento: EventEmitter<any> = new EventEmitter<any>();
  @Output() enviarProvincia: EventEmitter<any> = new EventEmitter<any>();
  @Output() enviarDistrito: EventEmitter<any> = new EventEmitter<any>();
  @Output() enviarRespuesta: EventEmitter<any> = new EventEmitter<any>();

  // @Output() idpro: EventEmitter<any> = new EventEmitter<any>();

  departametos = [
    {
   _id: '63d83589b36172c7882df505',
   nombre: 'AREQUIPA',
   pais: {
     _id: "63d29eddf056843fdb5953e1",
     nombre: "Peru",
   },
   ubigeo: '04'
  }]
  iddepartamento: string =  ""
  idprovincia: string =""

  selectedTabTienda= signal<number>(1);
  tiendaQuinonesSeleccionada: boolean = true;
  tiendaRiveroSeleccionada: boolean = false;
  descripcionSeleccion: string = ""

  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];

  nombreDep: string = "Departamento";
  nombreProv: string = "Provincia";
  nombreDis: string = "Distrito";

  Departamento: Departamento = {} as Departamento;
  provincia: Provincia = {} as Provincia;
  distrito: Distrito = {} as Distrito;



  onCheckboxChange(tienda: number) {
    if (tienda === 1) {
      this.descripcionSeleccion = "TIENDA QUIÑONES-AREQUIPA"
      this.tiendaQuinonesSeleccionada = !this.tiendaQuinonesSeleccionada;
      this.tiendaRiveroSeleccionada = false;
      this.service.tiendaEntrega.set("TIENDA QUIÑONES-AREQUIPA")
    } else if (tienda === 2) {
      this.descripcionSeleccion = "TIENDA RIVERO-AREQUIPA"
      this.tiendaRiveroSeleccionada = !this.tiendaRiveroSeleccionada;
      this.tiendaQuinonesSeleccionada = false;
      this.service.tiendaEntrega.set("TIENDA RIVERO-AREQUIPA")
    }
  }

  elegirTipoEntrega(accion: boolean){
    if(accion == true){
        this.selectedTabTienda.set(2)
        this.descripcionSeleccion = ""
        this.service.tiendaEntrega.set("")
        setTimeout(() => {
          this.rellenarDatos()
        }, 500);
    }else{
        this.selectedTabTienda.set(1)
        this.descripcionSeleccion = "TIENDA QUIÑONES-AREQUIPA"
        this.service.tiendaEntrega.set("TIENDA QUIÑONES-AREQUIPA")
        this.tiendaQuinonesSeleccionada = true;
        this.tiendaRiveroSeleccionada = false;
      }
  }

  recibirMensaje(mensaje: string) {
    this.iddepartamento = mensaje;
    this.selectprovincia.onProvinciaArray(mensaje);
  }

  recibirMensajeProvincia(mensaje: string) {
    this.idprovincia = mensaje;
    this.selectdistrito.onDistritoArray(mensaje);
  }

  async rellenarDatos(){
    this.nombre = this.UsuarioService.usuario().persona.nombre
    this.dni = this.UsuarioService.usuario().persona.documentoIdentidad
    this.telefono = this.UsuarioService.usuario().persona.telefono
    this.correo = this.UsuarioService.usuario().persona.email
    this.direccion = this.UsuarioService.usuario().persona.direccion
  }

  //============== SELECTS ENVIO ====================
  getAllDepartamentos(){
    this.api.GetAllDepartamento().subscribe(data => {
      this.departamentos = data;
    })
  }

  seleccionarDepartamento(departamento: any){
    this.Departamento = departamento
    this.nombreDep = departamento.nombre;
    this.service.departamento.set(departamento)
    this.getAllProvincias(departamento._id)
    this.enviarDepartamento.emit(departamento);
  }

  getAllProvincias(departamento: string): void{
    this.api.GetProvinciaForDepartamento(departamento).subscribe(data =>{
      this.provincias = data;
    });
  }

  seleccionarProvincia(provincia: any){
    this.provincia = provincia;
    this.nombreProv = provincia.nombre;
    this.getAllDistritos(provincia._id)
    this.enviarProvincia.emit(provincia);
    this.service.provincia.set(provincia)
  }

  getAllDistritos(id: string){
    this.api.GetDistritoForProvincia(id).subscribe(data =>{
      this.distritos = data;
    })
  }

  async clicSelectDistrito(distrito: Distrito){
    this.distrito = distrito;
    this.nombreDis = distrito.nombre;
    this.enviarDistrito.emit(distrito);
    this.service.distrito.set(distrito)
  }

  siguientePasoValidarEnvio() {
    if (Object.keys(this.Departamento).length === 0) {
      this.alertas.alertError("Error", "Por favor, seleccione un departamento antes de continuar.")
    } else if (Object.keys(this.provincia).length === 0) {
      this.alertas.alertError("Error", "Por favor, seleccione una provincia antes de continuar.")
    } else if (Object.keys(this.distrito).length === 0) {
      this.alertas.alertError("Error", "Por favor, seleccione un distrito antes de continuar.")
    } else if (this.direccion.trim() === '') {
      this.alertas.alertError("Error", "Por favor, ingrese una dirección antes de continuar.")
    }
    else if (this.correo.trim() === '') {
      this.alertas.alertError("Error", "Por favor, ingrese un correo electronico.")
    }
    else if (this.telefono.trim() === '') {
      this.alertas.alertError("Error", "Por favor, ingrese su telefono porfavor.")
    }
    else {
      this.service.nombre.set(this.nombre)
      this.service.dni.set(this.dni)
      this.service.telefono.set(this.telefono)
      this.service.email.set(this.correo)

      this.service.direccion.set(this.direccion)
      this.service.telefono.set(this.telefono)
      this.enviarRespuesta.emit(true);
    }
  }

  ngOnInit(){
    this.descripcionSeleccion = "TIENDA QUIÑONES-AREQUIPA"
    this.service.tiendaEntrega.set("TIENDA QUIÑONES-AREQUIPA")
    this.getAllDepartamentos()
    this.selectedTabTienda.set(1)
  }

  ngOnDestroy(){
    if(this.selectedTabTienda() == 2){
    let usuario: Cliente = this.UsuarioService.usuario()
    usuario.persona.telefono = this.telefono
    usuario.persona.email = this.correo
    usuario.persona.direccion = this.direccion
    usuario.persona.distrito = this.distrito
    this.event.emit(usuario)
    }else if(this.selectedTabTienda() == 1){

      this.service.nombre.set(this.nombre)
      this.service.dni.set(this.dni)
      this.service.telefono.set(this.telefono)
      this.service.email.set(this.correo)
      this.service.direccion.set(this.direccion)
      this.service.telefono.set(this.telefono)
      // this.service.departamento.set(this.Departamento)
      // this.service.provincia.set(this.provincia)
      // this.service.distrito.set(this.distrito)

      this.event2.emit("RECOJO EN "+ this.descripcionSeleccion)
      this.event.emit(this.UsuarioService.usuario())
      this.service.observaciones.set("RECOJO EN "+ this.descripcionSeleccion)
    }
  }

  ngAfterViewInit(){
    if(this.UsuarioService.tokenexiste() == true){
      this.rellenarDatos()
    }
  }

}
