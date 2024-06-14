import { Injectable, signal } from '@angular/core';
import { Cliente } from '../Models/Users/Cliente';
import { ServiceApiService } from './service-api.service';
import { firstValueFrom } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  tokenexiste = signal<boolean>(false)
  usuario = signal<Cliente>({} as Cliente)

  constructor(private api: ServiceApiService, private session: AuthServiceService) { }


  async GetPerfilUsuario(){
    let resp = this.session.ValidarExistenciaToken()
    if(resp == true){
      let tok = await firstValueFrom(this.api.GetPerfilData())
      this.tokenexiste.set(true)
      this.usuario.set(tok)
    }else{
      this.tokenexiste.set(false)
    }
  }



}
