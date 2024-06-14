import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InformacionCarritoComponent } from "../pasarela-pagos/informacion-carrito/informacion-carrito.component";
import { FormularioEnvioComponent } from "../pasarela-pagos/formulario-envio/formulario-envio.component";
import { FormularioPagoComponent } from "../pasarela-pagos/formulario-pago/formulario-pago.component";
import { FormasPagoComponent } from "../pasarela-pagos/formas-pago/formas-pago.component";
import { ResumenMontoTotalComponent } from "../pasarela-pagos/resumen-monto-total/resumen-monto-total.component";
import { ResumenCarritoComponent } from "../pasarela-pagos/resumen-carrito/resumen-carrito.component";
import { CompraInvitadoComponent } from "../pasarela-pagos/compra-invitado/compra-invitado.component";
import { FormEnvioComponent } from "./form-envio/form-envio.component";
import { RouterLink } from "@angular/router";
import { GenerateOvPdfComponent } from "../../Components/generate-ov-pdf/generate-ov-pdf.component";
import { ServiceApiService } from "../../Services/service-api.service";
import { CarritoService } from "../../Services/carrito.service";
import { PasarelaInvitadoService } from "./pasarela-invitado.service";
import { AlertasService } from "../../Services/alertas.service";
import { MatDialog } from "@angular/material/dialog";
import { FormaDePago } from "../../Models/NotaPedido/FormaDePago";
import { NotaPedido } from "../../Models/NotaPedido/NotaPedido";
import { Persona } from "../../Models/Users/Persona";
import { ClienteER } from "../../Models/NotaPedido/Cliente";
import { firstValueFrom } from "rxjs";
import { NotaPedidoDetalle } from "../../Models/NotaPedido/NotaPedidoDetalle";
import { SuccessCompraInvitadoComponent } from "../../Components/success-compra-invitado/success-compra-invitado.component";
import { Carrito } from "../../Models/Cart/Carrito";
import { FormPaymentComponent } from "./form-payment/form-payment.component";


@Component({
  selector: 'app-pasarela-invitado',
  standalone: true,
  imports: [
  FormsModule,
    CommonModule,
    InformacionCarritoComponent,
    FormularioEnvioComponent,
    FormularioPagoComponent,
    FormasPagoComponent,
    ResumenMontoTotalComponent,
    ResumenCarritoComponent,
    CompraInvitadoComponent,
    FormEnvioComponent,
    RouterLink,
    FormPaymentComponent,
    GenerateOvPdfComponent
  ],
  templateUrl: './pasarela-invitado.component.html',
  styleUrl: './pasarela-invitado.component.css'
})
export class PasarelaInvitadoComponent {

  private api = inject(ServiceApiService)
  public cart = inject(CarritoService)
  public service = inject(PasarelaInvitadoService)
  private alertas = inject(AlertasService)

  constructor(private dialog: MatDialog,) {
    let pre = this.precioTotalCarro();
    let monto = pre * 100;
  }

  tarjetaCredito: FormaDePago = {
    _id: "6420286c635c541fadd8422b",
    nombre: "TARJETA DE CRÉDITO"
  }

  selectedTab = signal<number>(1);
  valorBarraProgreso: number = 0;
  title = signal<string>("Completa el Formulario")

  getRespuesta(){
    this.seleccionarPasoCompra(true)
  }

  seleccionarPasoCompra(accion: any) {
    if (accion == true) {
      if (this.selectedTab() != 3) {
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

  async RealizarCompra(resp: boolean) {
    if (resp == true) {
      await this.CrearNotaPedido();
    } else if (resp == false) {
      return;
      // this.alertas.alertaFallida2("¡Ups!","Ocurrió un problema al procesar el pago, póngase en contacto con nosotros para obtener más información al respecto. Disculpe las molestias.")
    }
  }

  async CrearNotaPedido() {
    let notapedido: NotaPedido = {} as NotaPedido;
    notapedido.cliente = {} as ClienteER;
    notapedido.cliente.persona = {} as Persona;
    notapedido.fecha = new Date();
    notapedido.cliente.nombreUsuario = this.service.nombreUsuario()
    notapedido.cliente.pass = ""
    notapedido.cliente.persona.nombre = this.service.nombre() + this.service.apellidos()
    notapedido.cliente.persona.documentoIdentidad = this.service.dni().dni
    notapedido.cliente.persona.email = this.service.email()
    notapedido.cliente.persona.direccion = this.service.direccion().toUpperCase()
    notapedido.cliente.persona.telefono = this.service.telefono()
    notapedido.cliente.persona.ubigeo = this.service.distrito().ubigeo
    notapedido.cliente.persona.distrito = this.service.distrito()
    notapedido.observacion = this.service.observaciones();
    notapedido.aprobado = false    ;
    notapedido.aprobadoCredito = 'APROBADO';
    notapedido.fechaEntrega = new Date()
    notapedido.montoCobrar = this.precioTotalCarro();
    notapedido.montoCobrado = this.precioTotalCarro();
    notapedido.totalMinimo = this.precioTotalCarro();
    notapedido.subtotal = this.subTotal();
    notapedido.total = this.precioTotalCarro();
    notapedido.notaPedidoDetalle = await this.crearDetalle();
    notapedido.formaDePago = this.tarjetaCredito
    notapedido.descargado = false;
    notapedido.formaDePago = this.api.formaPagoEcommerce;
    notapedido.almacen = this.api.almacen;
    notapedido.moneda = this.api.monedaEcommerce;
    notapedido.utilidad = 0.18
    let resp = await firstValueFrom(this.api.SetNotaPedidoInvitado(notapedido));
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
    this.dialog.open(SuccessCompraInvitadoComponent, {
      height: 'auto',
      width: '600px',
      disableClose: true,
      data: numero
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

  ngOnInit(){
    let data = this.cart.carro()
    if(data.length == 0){
      this.title.set("Tu carrito de compras vacio")
    }
  }

  ngOnDestroy() {
    location.reload();
    this.service.numberOrder.set(0)
  }

}
