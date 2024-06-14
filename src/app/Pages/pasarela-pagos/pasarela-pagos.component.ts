import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SelectDepartamentoComponent } from '../../global/select-departamento/select-departamento.component';
import { SelectDistritoComponent } from '../../global/select-distrito/select-distrito.component';
import { SelectProvinciaComponent } from '../../global/select-provincia/select-provincia.component';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CarritoService } from '../../Services/carrito.service';
import { Carrito } from '../../Models/Cart/Carrito';
import { NotaPedido } from '../../Models/NotaPedido/NotaPedido';
import { Cliente } from '../../Models/Users/Cliente';
import { NotaPedidoDetalle } from '../../Models/NotaPedido/NotaPedidoDetalle';
import { TarjetaCreditoComponent } from '../../Components/tarjeta-credito/tarjeta-credito.component';
import { CompraInvitadoComponent } from './compra-invitado/compra-invitado.component';
import { InformacionCarritoComponent } from './informacion-carrito/informacion-carrito.component';
import { FormularioEnvioComponent } from './formulario-envio/formulario-envio.component';
import { ResumenCarritoComponent } from './resumen-carrito/resumen-carrito.component';
import { FormularioPagoComponent } from './formulario-pago/formulario-pago.component';
import { UsuarioService } from '../../Services/usuario.service';
import { ResumenMontoTotalComponent } from './resumen-monto-total/resumen-monto-total.component';
import { FormasPagoComponent } from './formas-pago/formas-pago.component';
import { AlertasService } from '../../Services/alertas.service';
import { Departamento } from '../../Models/Ubicacion/Departamento';
import { Provincia } from '../../Models/Ubicacion/Provincia';
import { Distrito } from '../../Models/Ubicacion/Distrito';
import { ServiceApiService } from '../../Services/service-api.service';
import { firstValueFrom } from 'rxjs';
import { SuccessCompraDialogComponent } from '../../Components/success-compra-dialog/success-compra-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../Auth/login-dialog/login-dialog.component';
import { PasarelaService } from './pasarela.service';

@Component({
  selector: 'app-pasarela-pagos',
  standalone: true,
  imports: [
    CommonModule,
    SelectDepartamentoComponent,
    SelectDistritoComponent,
    SelectProvinciaComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    TarjetaCreditoComponent,
    CompraInvitadoComponent,
    InformacionCarritoComponent,
    FormularioEnvioComponent,
    ResumenCarritoComponent,
    FormularioPagoComponent,
    ResumenMontoTotalComponent,
    FormasPagoComponent
  ],
  templateUrl: './pasarela-pagos.component.html',
  styleUrl: './pasarela-pagos.component.css'
})
export class PasarelaPagosComponent {

  private alertas = inject(AlertasService)
  private api = inject(ServiceApiService)
  public cart = inject(CarritoService)
  private ApiLogin = inject(AuthServiceService)
  public usuarioservice = inject(UsuarioService)
  private service = inject(PasarelaService)

  constructor(
    private dialog: MatDialog
  ) {
    let pre = this.precioTotalCarro();
    let monto = pre * 100;
  }

  title = signal<string>("Tus Productos Seleccionados")
  selectedTab = signal<number>(1);
  valorBarraProgreso: number = 0;
  usuario: Cliente = {} as Cliente
  observaciones: string = ""

  @ViewChild(LoginDialogComponent) verifyIsInvitado!: LoginDialogComponent;
  @ViewChild(SelectDepartamentoComponent) selectdepartamento!: SelectDepartamentoComponent;
  @ViewChild(SelectProvinciaComponent) selectprovincia!: SelectProvinciaComponent;
  @ViewChild(SelectDistritoComponent) selectdistrito!: SelectDistritoComponent;

  @ViewChild(FormularioEnvioComponent) Departamento!: FormularioEnvioComponent;

  iddepartamento: string = '';
  idprovincia: string = '';
  total: number = this.precioTotalCarro() * 100
  datos: any;
  tipo_pago: any;

  departamento: Departamento = {} as Departamento
  provincia: Provincia = {} as Provincia
  distrito: Distrito = {} as Distrito


  DatosDeObservaciones(data: string) {
    this.observaciones = data
  }

  getDepartamento(departamento: any) {
    this.departamento = departamento
  }
  getProvincia(provincia: any) {
    this.provincia = provincia
  }
  getDistrito(distrito: any) {
    this.distrito = distrito
  }

  verificarDatosEnvio(accion: any){
    if(!this.Departamento) {
      this.seleccionarPasoCompra(true)
    } else {
      this.alertas.alertaError2("Por favor, seleccione un departamento antes de continuar.")
      return;
    }
  }

  seleccionarPasoCompra(accion: any) {
    this.scrollToTop()
    if (accion == true) {
      if (this.selectedTab() != 3) {
        if (this.selectedTab() == 2 && !this.Departamento) {
          this.alertas.alertaError2("Por favor, seleccione un departamento antes de continuar.")
          return;
        }
        this.selectedTab.update(p => p + 1);
        this.valorBarraProgreso += 50;
      }
    } else {
      if (this.selectedTab() != 1) {
        this.selectedTab.update(p => p - 1)
        this.valorBarraProgreso -= 50
      }
    }
    if (this.selectedTab() == 1) {
      this.title.set("Tus Productos Seleccionados")
    } else if (this.selectedTab() == 2) {
      this.title.set("Datos de Envio")

    } else if (this.selectedTab() == 3) {
      this.title.set("Estás a un paso de concretar tu compra")
    }
  }

  checkTipo(event: any) {
    this.tipo_pago = event;
  }

  DatosDeUsuario(usuario: Cliente) {
    this.usuario = usuario
  }

  VaciarCarro() {
    this.cart.ClearCart();
  }

  eliminarDelCarrito(id: string | null) {
    this.cart.DeleteCarritoItem(id || "")
  }

  async RealizarCompra(resp: boolean) {
    if (resp == true) {
      await this.CrearNotaPedido();
    } else if (resp == false) {
      return;
    }
  }

  async CrearNotaPedido() {
    let notapedido: NotaPedido = {} as NotaPedido;
    let cli: Cliente = {} as Cliente;
    cli = this.usuario
    notapedido.aprobado = false;
    notapedido.aprobadoCredito = 'APROBADO';
    notapedido.cliente = this.ApiLogin.SetUsuarioAsCliente(cli);
    // notapedido.cliente.persona.distrito = this.selectdistrito.distrito
    notapedido.cliente.persona.distrito = this.distrito
    notapedido.cliente.persona.ubigeo = this.distrito.ubigeo
    notapedido.cliente.persona.direccion = this.usuario.persona.direccion.toUpperCase()
    notapedido.descargado = false;
    notapedido.fecha = new Date();
    notapedido.fechaEntrega = new Date();
    notapedido.montoCobrar = this.precioTotalCarro();
    notapedido.montoCobrado = this.precioTotalCarro();
    notapedido.totalMinimo = this.precioTotalCarro();
    notapedido.notaPedidoDetalle = await this.crearDetalle();
    notapedido.observacion = this.observaciones;
    notapedido.total = this.precioTotalCarro();
    notapedido.subtotal = this.subTotal();
    notapedido.aprobado = false;
    notapedido.formaDePago = this.api.formaPagoEcommerce;
    notapedido.almacen = this.api.almacen;
    notapedido.moneda = this.api.monedaEcommerce;
    notapedido.utilidad = 0.18
    let resp = await firstValueFrom(this.api.SetNotaPedido(notapedido));
    if (resp != null) {
      localStorage.removeItem("cart")
      this.service.numberOrder.set(resp)
      this.openLoaderCompra(resp)
    } else {
      this.alertas.alertaUps("Lo sentimos, su pedido no se generó correctamente. Por favor, contactese con nosotros para recibir asistencia.")
    }
  }

  async crearDetalle() {
    let carro = this.cart.carro();
    let detalles: NotaPedidoDetalle[] = [];
    for (let item of carro) {
      let det: NotaPedidoDetalle = {} as NotaPedidoDetalle;
      det.cantidad = item.cantidad;
      det.producto = item.producto;
      det.regalo = false;
      det.precioUnitario = item.producto.precio * item.producto.moneda.cambio;
      det.cantidadEntregado = 0;
      detalles.push(det);
    }
    return detalles;
  }

  openLoaderCompra(numero:string){
    this.dialog.open(SuccessCompraDialogComponent, {
      height: 'auto',
      width: '600px',
      disableClose: true,
      data: numero
    });
  }

  Logeate() {
    this.dialog.open(LoginDialogComponent, {
      height: 'auto',
      width: '600px',
      disableClose: false,
      data: 1111
    });

  }

  precioTotalUnidCarrito(carro: Carrito) {
    if (carro.producto.precioPromocionEcommerce != 0) {
      return carro.producto.precioPromocionEcommerce * carro.cantidad;
    } else {
      return carro.producto.precioEcommerce * carro.cantidad;
    }
  }

  precioUnitario(carro: Carrito) {
    if (carro.producto.precioPromocionEcommerce != 0) {
      return carro.producto.precioPromocionEcommerce;
    } else {
      return carro.producto.precioEcommerce;
    }
  }

  precioTotalCarro() {
    let carro = this.cart.carro();
    let tot: number = 0;
    for (let car of carro) {
      tot += this.precioTotalUnidCarrito(car);
    }
    return tot;
  }

  subTotal() {
    let pre = this.precioTotalCarro();
    let sub1 = pre / 1.18;
    let sub = sub1.toFixed(2);
    let resp = Number(sub);
    return resp;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async ngOnInit() {
    this.scrollToTop()
    this.cart.controlActivoSidebar(false);
  }

  ngOnDestroy() {
    this.cart.controlActivoSidebar(true);
    this.service.numberOrder.set(0)
    location.reload();
  }

}
