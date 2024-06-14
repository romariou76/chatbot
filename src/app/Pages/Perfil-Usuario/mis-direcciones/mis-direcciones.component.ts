import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ServiceApiService } from '../../../Services/service-api.service';

@Component({
  selector: 'app-mis-direcciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-direcciones.component.html',
  styleUrl: './mis-direcciones.component.css'
})
export class MisDireccionesComponent {

  constructor(private api: ServiceApiService){}
  
  Direccion: string = '';

  async ObtenerDireccionUsuario(){
    let dato = await firstValueFrom(this.api.GetPerfilData())
    this.Direccion = dato.persona.direccion
  }

  async ngOnInit(){
    await this.ObtenerDireccionUsuario()
  }


}