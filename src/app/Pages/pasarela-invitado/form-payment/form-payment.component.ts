import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ServiceApiService } from '../../../Services/service-api.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { CarritoService } from '../../../Services/carrito.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenTarjeta } from '../../../Models/Cart/Cargo';
import { LoaderCompraComponent } from '../../../Components/loader-compra/loader-compra.component';
import { Carrito } from '../../../Models/Cart/Carrito';
import { AlertasService } from '../../../Services/alertas.service';
import { PasarelaInvitadoService } from '../pasarela-invitado.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-payment',
  standalone: true,
  imports: [
  FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-payment.component.html',
  styleUrl: './form-payment.component.css'
})
export class FormPaymentComponent {

  @Input() monto: number = 0
  @Output() event = new EventEmitter<boolean>()
  private alerta = inject(AlertasService)
  private service = inject(PasarelaInvitadoService)


  botonSeguridad: boolean = true
  tokentarjeta = new FormGroup({
    tarjeta: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    month: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    year: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)] )
  })

  constructor(private api: ServiceApiService,
    public usuarioservice: UsuarioService,
    private cart: CarritoService,
    private dialog: MatDialog,
  ){}

  async RealizarPago(){
    if(!this.botonSeguridad){
      alert("no")
      return;
    }
    this.botonSeguridad = false
    try {
    this.openLoaderCompra()


    let mes: number = Number(this.tokentarjeta.value.month)
      let token: TokenTarjeta = {
      card_number: this.tokentarjeta.value.tarjeta || "",
      cvv: this.tokentarjeta.value.cvv || "",
      email: this.service.email(),
      expiration_month: mes.toString(),
      expiration_year: this.tokentarjeta.value.year || "",
      metadata: this.service.dni()
    }

    // let monto = 100
    let monto = this.precioTotalCarro() * 100
    this.botonSeguridad = false
    let resp = await firstValueFrom(this.api.CrearTokenTarjeta(token, monto))
    if(resp != "200"){
      this.closeDialog()
      this.alerta.manejarErroresPago(resp)
      this.event.emit(false)
      this.botonSeguridad = true
    }else{
      console.log(resp)
      this.closeDialog()
      this.event.emit(true)
      this.botonSeguridad = false
    }

  } catch (error) {
    this.event.emit(false);
    this.closeDialog()
    this.botonSeguridad = true
    this.alerta.alertaFallida("Error")
  }
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  openLoaderCompra(){
    let dialogRef = this.dialog.open(LoaderCompraComponent, {
      height: 'auto',
      width: '600px',
      disableClose: true,
    });
  }

  precioTotalCarro() {
    let carro = this.cart.carro();
    let tot: number = 0;
    for (let car of carro) {
      tot += this.precioTotalUnidCarrito(car);
    }
    return tot;
  }

  precioTotalUnidCarrito(carro: Carrito) {
    if (carro.producto.precioPromocionEcommerce != 0) {
      return carro.producto.precioPromocionEcommerce * carro.cantidad;
    } else {
      return carro.producto.precioEcommerce * carro.cantidad;
    }
  }



  ngOnInit(){
    this.botonSeguridad = true
  }

}
