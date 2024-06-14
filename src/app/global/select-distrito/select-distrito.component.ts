import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output , Input} from '@angular/core';
import { Distrito } from '../../Models/Ubicacion/Distrito';
import { ServiceApiService } from '../../Services/service-api.service';

@Component({
  selector: 'app-select-distrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-distrito.component.html',
  styleUrl: './select-distrito.component.css'
})
export class SelectDistritoComponent {

  @Output() distritoemit = new EventEmitter<Distrito>();
  @Input() idprov: string = "";
  distritos: Distrito[] = [];
  distrito: Distrito = {} as Distrito;
  nombre: string = "Distrito";
  id: string = "";
  selected: boolean = false

  constructor(private api : ServiceApiService){}

  async reiniciar(){
    this.nombre = "Distrito";
    this.distrito = {} as Distrito;
    this.distritos = [];
  }

  async clicSelectDistrito(distrito: Distrito){
    this.distrito = distrito;
    this.nombre = distrito.nombre;
    this.id = distrito._id ?? "";
    this.selected = true
    this.distritoemit.emit(distrito);
  }

  onDistritoArray(provincia: string){
    this.api.GetDistritoForProvincia(provincia).subscribe(data =>{
      this.distritos = data;
    })
  }

  ngOnInit(){}

}
