import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ServiceApiService } from '../../Services/service-api.service';
import { Departamento } from '../../Models/Ubicacion/Departamento';

@Component({
  selector: 'app-select-departamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-departamento.component.html',
  styleUrl: './select-departamento.component.css'
})
export class SelectDepartamentoComponent {

  @Output() idevent = new EventEmitter<string>();

  inicio: number = 0;
  busqueda: string = "";
  departamentos: Departamento[] = [];
  departamento: Departamento = {} as Departamento;
  nombre: string = "Departamento";

  constructor(private api: ServiceApiService){}

  clicSelectDepartamento(departamento: Departamento){
    this.departamento = departamento;
    this.nombre = departamento.nombre;
    this.idevent.emit(departamento._id ?? "");
  }

  onDepartamentoArray(){
    this.api.GetAllDepartamento().subscribe(data => {
      this.departamentos = data;
    })
  }

  onScrollArray(): void{
    this.inicio += 1;
    this.onDepartamentoArray();
  }

  async reiniciar(){
    this.departamento = {} as Departamento;
    this.nombre = "Seleccione un departamento";
    this.onDepartamentoArray();
  }

  onBusquedaDepartamento(): void{
    this.inicio = 0;
    this.onDepartamentoArray();
  }

  ngOnInit():void{
    this.onDepartamentoArray();
  }

}
