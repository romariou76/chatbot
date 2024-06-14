import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ServiceApiService } from '../../Services/service-api.service';
import { Provincia } from '../../Models/Ubicacion/Provincia';

@Component({
  selector: 'app-select-provincia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-provincia.component.html',
  styleUrl: './select-provincia.component.css'
})
export class SelectProvinciaComponent {

  @Output() idpro = new EventEmitter<string>();

  provincias: Provincia[] = [];
  provincia: Provincia = {} as Provincia;
  nombre: string = "Provincia";
  id: string = "";


  constructor(private api : ServiceApiService){

  }

  clicSelectProvincia(provincia: Provincia){
    this.provincia = provincia;
    this.nombre = provincia.nombre;
    this.id = provincia._id ?? "";
    this.idpro.emit(provincia._id ?? "");

  }

  async reiniciar(){
    this.provincia = {} as Provincia;
    this.nombre = "Seleccione una provincia";
    this.provincias = [];
  }

  onProvinciaArray(departamento: string): void{
    this.api.GetProvinciaForDepartamento(departamento).subscribe(data =>{
      this.provincias = data;
    });
  }

}
