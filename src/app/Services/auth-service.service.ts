import { EventEmitter, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './../Models/Users/Users';
import { LIVE_ANNOUNCER_ELEMENT_TOKEN } from '@angular/cdk/a11y';
import { TokenData } from '../Models/Users/TokenData';
import jwtDecode from 'jwt-decode';
import { Cliente } from '../Models/Users/Cliente';
import { ClienteER } from '../Models/NotaPedido/Cliente';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  API = environment.apiUrl + "api/";

  public loginevent: EventEmitter<boolean> = new EventEmitter<boolean>()
  public perfil: EventEmitter<string> = new EventEmitter<string>()
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  user = signal<TokenData>({} as TokenData)
  session = signal<boolean>(false)

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  Headers() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.GetTokenString()
    );
  }

  Login(form: Users) {
    let direccion = this.API + "Autenticacion/AutenticacionClienteEcommerce";
    return this.http.post(direccion, form, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          let err: Observable<string> = {} as Observable<string>;
          alert('Error interno de la web, lo solucionaremos pronto');
          return err;
        })
      );
  }

  async InicioSesion(user: Users) {
    let resp = await firstValueFrom(this.Login(user))
    if (resp != "400") {
      this.loginevent.emit(true)
    }
  }

  async EventoPerfil(nav: string) {
    this.perfil.emit(nav)
  }


  GetTokenString(): string {
    let token = localStorage.getItem('token');
    return token || '';
  }

  GetToken(): TokenData {
    let tok = localStorage.getItem("token")?.toString();
    let t: string = "";

    if (tok != "" || tok != null || tok != undefined) {
      t = tok ?? "";
    }

    let token = jwtDecode(t) as TokenData;
    return token;
  }

  GetPerfilData() {
    let headers = this.Headers();
    let token = this.GetToken()
    let ApiUser = `${this.API}Cliente/GetClienteEcommerceId/${token.identificador}`;

    return this.http.get<Cliente>(ApiUser, {headers})
      .pipe(
        catchError((error) => {
          let err: Observable<Cliente> = {} as Observable<Cliente>;
          alert('No se pudo obtener datos del usuario');

          return err;
        })
      );
  }

  ValidateToken() {
    let tok = localStorage.getItem("token")?.toString();
    let t: string = "";

    if (tok != "" || tok != null || tok != undefined) {
      t = tok ?? "undefined";
    }

    if (t != "undefined") {
      return t;
    } else {
      return t;
    }
  }

  ValidarExistenciaToken() {
    try {
      let tok = localStorage.getItem("token")?.toString();
      let t: string = "";

      if (tok != "" || tok != null || tok != undefined) {
        t = tok ?? "undefined";
      }
      if (jwtDecode(t)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false
    }
  }

  SetUsuarioAsCliente(usuari: Cliente) {
    let cliente: ClienteER = {} as ClienteER
    cliente._id = usuari._id
    cliente.fechaRegistro = usuari.fechaRegistro
    cliente.idEcommerce = usuari._id
    cliente.nivel = usuari.nivel
    cliente.nombreUsuario = usuari.nombreUsuario
    cliente.pass = usuari.pass
    cliente.persona = usuari.persona
    cliente.sede = usuari.sede
    return cliente
  }

  CerrarSesion(): void {
    localStorage.setItem("token", "undefined");
  }

}
