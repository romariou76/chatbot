import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoIdentidad } from '../../Models/Users/TipoDocumentoIdentidad';
import { firstValueFrom } from 'rxjs';
import { ServiceApiService } from '../../Services/service-api.service';

@Component({
  selector: 'app-select-tipo-documento-identidad',
  standalone: true,
  imports: [CommonModule],
templateUrl: './select-tipo-documento-identidad.component.html',
  styleUrl: './select-tipo-documento-identidad.component.css'
})
export class SelectTipoDocumentoIdentidadComponent {

  @Output() datosEnviadosAlPadre = new EventEmitter<string>();
  tipodocumentoidentidades: TipoDocumentoIdentidad[] = [];
  tipodocumentoident : TipoDocumentoIdentidad = {} as TipoDocumentoIdentidad;
  id: string = "6420286c635c541fadd8422c";
  nombre: string ="Elige tu tipo de documento";

  constructor(private api : ServiceApiService){}

  async clicSelectTipoDocumentoIdentidad(tipodocumentoidentidad : TipoDocumentoIdentidad){
    this.enviarDatoAlPadre(tipodocumentoidentidad)
    this.tipodocumentoident = tipodocumentoidentidad;
    this.nombre = tipodocumentoidentidad.nombre;
    this.id = tipodocumentoidentidad._id ?? "";
  }

  async onTipoDocumentoIdentidadArray(){
    let documento = await firstValueFrom(this.api.GetAllTipoDocumentoIdentidad())
    this.tipodocumentoidentidades = documento.filter(p => p._id == "6420286c635c541fadd8422c" || p._id == "6420286c635c541fadd8422e")
    this.nombre = this.tipodocumentoidentidades[0].nombre
    this.tipodocumentoident = this.tipodocumentoidentidades[0]
  }

  async reiniciar(){
    this.nombre = "Seleccione un Documento";
    this.tipodocumentoident = {} as TipoDocumentoIdentidad;
    await this.onTipoDocumentoIdentidadArray();
  }

  async ngOnInit(){
    await this.onTipoDocumentoIdentidadArray();
  }

  async enviarDatoAlPadre(tipodocumentoidentidad: TipoDocumentoIdentidad) {
    // console.log("el dato enciado es " + tipodocumentoidentidad.nombre)
    this.datosEnviadosAlPadre.emit(tipodocumentoidentidad.abreviatura);
  }

}
