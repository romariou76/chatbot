import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Departamento } from '../../../Models/Ubicacion/Departamento';
import { Provincia } from '../../../Models/Ubicacion/Provincia';
import { Distrito } from '../../../Models/Ubicacion/Distrito';
import { ServiceApiService } from '../../../Services/service-api.service';
import { PasarelaInvitadoService } from '../pasarela-invitado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-envio',
  standalone: true,
  imports: [
  CommonModule,
    FormsModule
  ],
  templateUrl: './form-envio.component.html',
  styleUrl: './form-envio.component.css'
})
export class FormEnvioComponent {

  // ===========ROMARIO===========
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

  private service = inject(PasarelaInvitadoService)
  private api = inject(ServiceApiService)

  @Output() enviarRespuesta = new EventEmitter<any>();

  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];

  nombreDep: string = "Departamento";
  nombreProv: string = "Provincia";
  nombreDis: string = "Distrito";

  Departamento: Departamento = {} as Departamento;
  provincia: Provincia = {} as Provincia;
  distrito: Distrito = {} as Distrito;
  direccion: string = ""

  selectedTabTienda= signal<number>(1);
  tiendaQuinonesSeleccionada: boolean = true;
  tiendaRiveroSeleccionada: boolean = false;
  descripcionSeleccion: string = ""

 //============== SELECTS ENVIO ====================
 selectShop(tienda: number) {
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
    }else{
      this.selectedTabTienda.set(1)
      this.descripcionSeleccion = "TIENDA QUIÑONES-AREQUIPA"
      this.service.tiendaEntrega.set("TIENDA QUIÑONES-AREQUIPA")
      this.tiendaQuinonesSeleccionada = true;
      this.tiendaRiveroSeleccionada = false;
    }
}

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
    console.log(departamento)
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
    this.service.provincia.set(provincia)
  }
  getAllDistritos(id: string){
    this.api.GetDistritoForProvincia(id).subscribe(data =>{
      this.distritos = data;
    })
  }
  async seleccionarDistrito(distrito: Distrito){
    this.distrito = distrito;
    this.nombreDis = distrito.nombre;
    this.service.distrito.set(distrito)
  }
// VALIDACION STEPS
  siguientePasoValidarEnvio() {
    if (Object.keys(this.Departamento).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione un departamento antes de continuar.',
      });
    } else if (Object.keys(this.provincia).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione una provincia antes de continuar.',
      });
    } else if (Object.keys(this.distrito).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione un distrito antes de continuar.',
      });
    } else if (this.direccion.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese una dirección antes de continuar.',
      });
    }

    else {
      this.service.direccion.set(this.direccion)
      this.service.imprimir()
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
      return;
    }else if(this.selectedTabTienda() == 1){
      this.service.observaciones.set("RECOJO EN "+ this.descripcionSeleccion)
    }
  }


}
