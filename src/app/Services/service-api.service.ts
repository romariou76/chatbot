import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Producto } from '../Models/Logistica/Producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Cliente } from '../Models/Users/Cliente';
import { Departamento } from '../Models/Ubicacion/Departamento';
import { Provincia } from '../Models/Ubicacion/Provincia';
import { Distrito } from '../Models/Ubicacion/Distrito';
import { DniORuc } from '../Models/Sunat/DniORuc';
import { TipoDocumentoIdentidad } from '../Models/Users/TipoDocumentoIdentidad';
import { Correo } from '../Models/Helpers/Correo';
import Swal from 'sweetalert2';
import { EspecificacionesProducto } from '../Models/Logistica/EspecificacionesProducto';
import { NotaPedido } from '../Models/NotaPedido/NotaPedido';
import { Router } from '@angular/router';
import { Cargo, TokenTarjeta } from '../Models/Cart/Cargo';
import { FiltrosBusqueda } from '../Models/Helpers/FiltrosBusqueda';
import { environment } from '../environments/environment';
import { ErrorCulqui } from '../Models/Errors/ErrorCulqui';

@Injectable({
  providedIn: 'root',
})
export class ServiceApiService {

  url = environment.apiUrl + "api/";

  constructor(
    private http: HttpClient,
    private auth: AuthServiceService,
    private route: Router
  ) {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  Headers() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.auth.GetTokenString()
    );
  }

  GetPerfilData() {
    let headers = this.Headers();
    let token = this.auth.GetToken();
    let ApiUser = this.url + 'Cliente/GetClienteEcommerceId/' + token.identificador;
    return this.http.get<Cliente>(ApiUser, { headers }).pipe(
      catchError((error) => {
        let err: Observable<Cliente> = {} as Observable<Cliente>;
        return err;
      })
    );

  }
  GetConsultaNotaPedido( numero : string){
    let headers = this.Headers();
    let apiNotaPedido = this.url + 'NotaPedido/GetBusquedaNotaPedidoEcommerce/'+ numero;

    return this.http.get<NotaPedido>(apiNotaPedido,{headers})
  }


  GetDistritoForUbigeo(ubigeo: string) {
    let headers = this.Headers();
    let distrito = this.url + 'Distrito/GetDistritoForUbigeo/' + ubigeo;
    return this.http.get<Distrito>(distrito, { headers }).pipe(
      catchError((error) => {
        let err: Observable<Distrito> = {} as Observable<Distrito>;

        return err;
      })
    );
  }

  GetNotaPedidoIdEcommerce(id:string){
    let headers = this.Headers();
    let url = this.url+ "NotaPedido/GetNotaPedidoIdEcommerce/"+ id
    return this.http.get<NotaPedido[]>(url, {headers}).pipe(
      catchError((error) => {
        let err: Observable<NotaPedido[]> = {} as Observable<NotaPedido[]>;

        return err;
      })
    )
  }

  GetAllTipoDocumentoIdentidad() {
    let headers = this.Headers();
    let documento =
      this.url + 'TipoDocumentoIdentidad/GetAllTipoDocumentoIdentidad';
    return this.http.get<TipoDocumentoIdentidad[]>(documento, { headers }).pipe(
      catchError((error) => {
        let err: Observable<TipoDocumentoIdentidad[]> = {} as Observable<
          TipoDocumentoIdentidad[]
        >;

        return err;
      })
    );
  }

  GetNotaPedidoId(id: string) {
    let headers = this.Headers();
    let uri = this.url + 'NotaPedido/GetNotaPedidoId/' + id;
    return this.http.get<NotaPedido>(uri, { headers }).pipe(
      catchError((error) => {
        let err: Observable<NotaPedido> = {} as Observable<NotaPedido>;
        alert('No se encontro la Orden de Venta');
        this.route.navigate(['perfil/pedidos']);
        return err;
      })
    );
  }

  GetDistritoForProvincia(provincia: string) {
    let headers = this.Headers();
    let distrito = this.url + 'Distrito/GetDistritoForProvincia/' + provincia;
    return this.http.get<Distrito[]>(distrito, { headers }).pipe(
      catchError((error) => {
        let err: Observable<Distrito[]> = {} as Observable<Distrito[]>;

        return err;
      })
    );
  }

  GetAllDepartamento() {
    let headers = this.Headers();
    let departamento = this.url + 'Departamento/GetAllDepartamento';
    return this.http.get<Departamento[]>(departamento, { headers }).pipe(
      catchError((error) => {
        let err: Observable<Departamento[]> = {} as Observable<Departamento[]>;

        return err;
      })
    );
  }

  GetClienteUsuarioExistente(usuario: string) {
    let uri = this.url + 'Cliente/GetClienteUsuarioExistente/' + usuario;
    return this.http.get<string>(uri).pipe(
      catchError((error) => {
        let err: Observable<string> = {} as Observable<string>;

        return err;
      })
    );
  }

  ObtenerDNI(numero: string) {
    let headers = this.Headers();
    let dnioruc = this.url + 'Cliente/ObtenerDNI/' + numero;
    return this.http.get<DniORuc>(dnioruc, { headers }).pipe(
      catchError((error) => {
        let err: Observable<DniORuc> = {} as Observable<DniORuc>;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontro su documento, intente de nuevo',
          showConfirmButton: false,
          timer: 3000,
        });

        return err;
      })
    );
  }

  ObtenerRUC(numero: string) {
    let headers = this.Headers();
    let dnioruc = this.url + 'Cliente/ObtenerRUC/' + numero;
    return this.http.get<DniORuc>(dnioruc, { headers }).pipe(
      catchError((error) => {
        let err: Observable<DniORuc> = {} as Observable<DniORuc>;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontro su documento, intente de nuevo',
          showConfirmButton: false,
          timer: 3000,
        });
        return err;
      })
    );
  }

  GetProvinciaForDepartamento(departamento: string) {
    let headers = this.Headers();
    let provincia =
      this.url + 'Provincia/GetProvinciaForDepartamento/' + departamento;
    return this.http.get<Provincia[]>(provincia, { headers }).pipe(
      catchError((error) => {
        let err: Observable<Provincia[]> = {} as Observable<Provincia[]>;

        return err;
      })
    );
  }

  CargandoProductos() {
    let cargandoProductos = '200';
    return cargandoProductos;
  }

  GetAllProductoEcommerceLimite(inicio: number) {
    let url =
      this.url + 'Producto/GetAllProductoEcommerceVistaLimite/' + inicio;
    return this.http.get<Producto[]>(url).pipe(
      catchError((error) => {
        let err: Observable<Producto[]> = {} as Observable<Producto[]>;
        // alert('Fallido');
        return err;
      })
    );
  }
  GetAllProductoEcommerceCategoriaLimite(inicio: number, categoria: string){
    let url =
    this.url + 'Producto/GetAllProductoEcommerceCategoriaLimite/' + inicio + "&" + categoria;
  return this.http.get<Producto[]>(url).pipe(
    catchError((error) => {
      let err: Observable<Producto[]> = {} as Observable<Producto[]>;
      return err;
    })
  );
  }

  GetProductDetails(id: string) {
    let url = this.url + 'Producto/GetProductoId/' + id;
    return this.http.get<Producto>(url).pipe(
      catchError((error) => {
        let err: Observable<Producto> = {} as Observable<Producto>;
        return err;
      })
    );
  }

  GetBusquedaProductoEcommerceFiltro(inicio: number, busqueda: FiltrosBusqueda){
    let url = this.url + 'Producto/GetBusquedaProductoEcommerceFiltro/' + inicio;
    return this.http.post<Producto[]>(url, busqueda).pipe(
      catchError((error) => {
        let err: Observable<Producto[]> = {} as Observable<Producto[]>;
        return err;
      })
    );
  }

  GetEspecificacionesProducto(id: string) {
    let url = this.url + 'EspecificacionesProductoEcommerce/GetEspecificacionProductoId/' + id;

    return this.http.get<EspecificacionesProducto>(url).pipe(
      catchError((error) => {
        let err: Observable<EspecificacionesProducto> =
          {} as Observable<EspecificacionesProducto>;
          return err;
      })
    );
  }

  VerificarExistenciaCorreoEcommerce(email: Correo) {
    let act = this.url + 'Cliente/VerificarExistenciaCorreoEcommerce';
    return this.http.post(act, email, { responseType: 'text' }).pipe(
      catchError((error) => {
        let err: Observable<string> = {} as Observable<string>;
        return err;
      })
    );
  }

  SetRegistro(cliente: Cliente) {
    let act = this.url + 'Cliente/SetClienteEcommerce';
    return this.http.post(act, cliente, { responseType: 'text' }).pipe(
      catchError((error) => {
        let err: Observable<string> = {} as Observable<string>;
        return err;
      })
    );
  }

  CrearCargo(cargo: Cargo){
    let url = this.url + 'ApiCulqi/CrearCargo'
    return this.http.post(url, cargo, {responseType: "text"}).pipe(
      catchError((error) => {
        let err: Observable<string> = {} as Observable<string>
        return err
      })
    )
  }

  CrearTokenTarjeta(token: TokenTarjeta, mount: number): Observable<any> {
    let url = this.url + 'ApiCulqi/TokenTarjeta/'+ mount
    return this.http.post(url, token, {responseType: "text"}).pipe(
      catchError((error) => {
        let err: Observable<ErrorCulqui> = {} as Observable<ErrorCulqui>
        return err
      })
    )
  }


  SetNotaPedido(notapedido: NotaPedido): Observable<number | any>{
    let headers = this.Headers()
    let url = this.url + "NotaPedido/SetNotaPedidoEcommerce"
    return this.http.post(url, notapedido, { responseType: "text", headers}).pipe(
      catchError((error) => {
        let err: Observable<number> = {} as Observable<number>
        return err
      })
    )
  }


  SetNotaPedidoInvitado(notapedido: NotaPedido): Observable<number | any>  {
    let url = this.url + "NotaPedido/SetNotaPedidoEcommerceInvitado"
    return this.http.post(url, notapedido).pipe(
      catchError((error) => {
        let err: Observable<number> = {} as Observable<number>
        return err
      })
    )
  }


// VARIABLES GLOBALES
almacen =
{
  _id: "64202867635c541fadd84212",
  sede: {
    _id: "63d838293e0043469410d204",
    nombre: "AREQUIPA QUIÑONES",
    direccion: "Urb. Magisterial II Mz. B lote 4 Yanahuara",
    telefono: "973688821",
    distrito: {
      _id: "63d836a96f62f444afa4204a",
      nombre: "YANAHUARA",
      provincia: {
        _id: "63d835e50b0594a8bcb13517",
        nombre: "AREQUIPA",
        departamento: {
          _id:"63d83589b36172c7882df505",
          nombre: "AREQUIPA",
          pais: {
            _id:"63d29eddf056843fdb5953e1",
            nombre: "Peru"
          },
          ubigeo: "04"
        },
        ubigeo: "0401"
      },
      ubigeo: "040126"
    }
  },
  nombre: "AREQUIPA QUIÑONES",
  telefono: "973688821",
  abreviatura: "A-Q001"
}

monedaEcommerce = {
  _id: "637e3014dc34a6f9bac146a6",
  nombre: "SOLES",
  cambio: 1
}

formaPagoEcommerce = {
  _id: "6420286c635c541fadd8422b",
  nombre: "TARJETA DE CRÉDITO"
}

}
