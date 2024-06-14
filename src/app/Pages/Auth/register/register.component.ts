import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { SelectDepartamentoComponent } from '../../../global/select-departamento/select-departamento.component';
import { SelectProvinciaComponent } from '../../../global/select-provincia/select-provincia.component';
import { SelectDistritoComponent } from '../../../global/select-distrito/select-distrito.component';
import { SelectTipoDocumentoIdentidadComponent } from '../../../global/select-tipo-documento-identidad/select-tipo-documento-identidad.component';
import { ServiceApiService } from '../../../Services/service-api.service';
import { Correo } from '../../../Models/Helpers/Correo';
import { Cliente } from '../../../Models/Users/Cliente';
import { Persona } from '../../../Models/Users/Persona';
import { SessionService } from '../../../Services/session.service';
import { FormsModule } from '@angular/forms';
import { TipoDocumentoIdentidad } from '../../../Models/Users/TipoDocumentoIdentidad';
import { MatDialog } from '@angular/material/dialog';
import { TerminosCondicionesComponent } from '../../Contenido/terminos-condiciones/terminos-condiciones.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SelectDepartamentoComponent, SelectDistritoComponent, SelectProvinciaComponent, SelectTipoDocumentoIdentidadComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild(SelectDepartamentoComponent) selectdepartamento!: SelectDepartamentoComponent;
  @ViewChild(SelectProvinciaComponent) selectprovincia!: SelectProvinciaComponent;
  @ViewChild(SelectDistritoComponent) selectdistrito!: SelectDistritoComponent;
  @ViewChild(SelectTipoDocumentoIdentidadComponent) tipodocumentoidentidad!: SelectTipoDocumentoIdentidadComponent;

  VectorImg = "https://imagenes.upgrade.com.pe/Logos/Mobile-login-Cristina.webp"
  TextoBotonRegistrar = "Registrarse"
  validacionregistro: boolean = true
  validacionusuari: boolean = true
  validacioncorreo: boolean = true

  documentotexto: string = "DNI"


  pass: string =""
  telefono: string = ""
  nombreusuario: string =""
  direccion: string = ""
  email: string = ""
  documentoidentidad: string ="";
  iddepartamento: string = "";
  idprovincia: string ="";
  nombre: string = ""
  aceptarTerminos: boolean = false

  TipoDocumento_Identidad: string = ""

  constructor(private router: Router, private api: ServiceApiService, private session: SessionService, private dialog: MatDialog){

  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  validacionRegistro(){
    if(this.validacioncorreo == false){
      this.validacionregistro = false
    }else{
      this.validacionregistro = true
    }
  }

  recibirMensaje(mensaje: string){
    this.iddepartamento = mensaje;
    this.selectprovincia.onProvinciaArray(mensaje);
  }

  recibirMensajeProvincia(mensaje: string){
    this.idprovincia = mensaje;
    this.selectdistrito.onDistritoArray(mensaje);
  }

  async clicBusquedaDocumento(){
    if(this.tipodocumentoidentidad.id == "6420286c635c541fadd8422c"){
      this.TipoDocumento_Identidad =  "DNI"
      let data = await firstValueFrom(this.api.ObtenerDNI(this.documentoidentidad))
        this.nombre = data.nombre ?? "";
        this.direccion = data.direccion ?? "";
        if(data.nombre == null){
          this.session.AlertError("Error en Documento", "No se encontro su documento de identidad")

        }

      }else if(this.tipodocumentoidentidad.id == "6420286c635c541fadd8422e"){
        let data = await firstValueFrom(this.api.ObtenerRUC(this.documentoidentidad))
        this.TipoDocumento_Identidad =  "RUC"
      // console.log(data);

        this.nombre = data.nombre ?? "";
        this.direccion = data.direccion ?? "";
        let ubi = data.ubigeo ?? "";
        if(ubi != ""){
        let dist = await firstValueFrom(this.api.GetDistritoForUbigeo(ubi));
        if(dist != null){
          this.selectdepartamento.clicSelectDepartamento(dist.provincia.departamento);
          this.selectprovincia.clicSelectProvincia(dist.provincia);
          this.selectdistrito.clicSelectDistrito(dist);
          }
        }
        if(data.nombre == null){
          this.session.AlertError('Error en el registro' , 'Por favor, completa todos los campos.')
        }

    }
}

  async existenciaUsuario(){
    let resp = await firstValueFrom(this.api.GetClienteUsuarioExistente(this.nombreusuario))
    if(resp == "200"){
      this.validacionusuari = false
      this.validacionRegistro()
    }else{
      this.validacionusuari = true
      this.validacionRegistro()

    }
  }

  async existenciacorreo(){
    let correo: Correo = {email: this.email} as Correo
    let resp = await firstValueFrom(this.api.VerificarExistenciaCorreoEcommerce(correo))
    if(resp == "200"){
      this.validacioncorreo = false
      this.validacionRegistro()

    }else{
      this.validacioncorreo = true
      this.validacionRegistro()

    }
  }

  async RegistrarBoton1(dato: string){
    this.TextoBotonRegistrar = dato
  }

  async registrar(){

    this.RegistrarBoton1("Registrando...")
    if (
      !this.nombre ||
      !this.documentoidentidad ||
      !this.direccion ||
      !this.telefono ||
      !this.tipodocumentoidentidad ||
      !this.pass ||
      !this.email ||
      !this.selectdistrito.selected) {
      this.RegistrarBoton1("Registrarse")
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Por favor, completa todos los campos.',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    if (!this.aceptarTerminos) {
      this.RegistrarBoton1("Registrarse")
      Swal.fire({
        icon: 'warning',
        title: 'Acepta los términos y condiciones',
        text: 'Por favor, acepta los términos y condiciones antes de registrar.',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    let cliente: Cliente = {} as Cliente
    let persona: Persona = {} as Persona
    persona.direccion = this.direccion.toUpperCase()
    cliente.fechaRegistro = new Date()
    persona.nombre = this.nombre. toUpperCase()
    persona.documentoIdentidad = this.documentoidentidad
    persona.tipoDocumentoIdentidad = this.tipodocumentoidentidad.tipodocumentoident
    persona.telefono = "+51 "+ this.telefono
    cliente.pass = this.pass
    persona.email = this.email
    persona.ubigeo = this.selectdistrito.distrito.ubigeo
    persona.distrito = this.selectdistrito.distrito
    cliente.nombreUsuario = this.nombreusuario
    cliente.terminosCondiciones = true
    cliente.persona = persona
    let resp = await firstValueFrom(this.api.SetRegistro(cliente));
    if(resp != "400"){
      this.RegistrarBoton1("Exitoso!")
      this.session.AlertSuccess("Registro Exitoso")

      await new Promise(resolve => setTimeout(resolve, 1500));
      this.router.navigate(['/']);
    }else{
      this.RegistrarBoton1("Registrarse")
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Registro Fallido',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  OpenTerminosYCondiciones(){
    let dial = this.dialog.open(TerminosCondicionesComponent)
  }


  ngOnInit(){
    this.scrollToTop()
  }

  recibirDatosDelHijo(datos: string) {
    this.documentotexto = datos

  }

}
