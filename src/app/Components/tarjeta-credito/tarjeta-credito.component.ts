import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceApiService } from '../../Services/service-api.service';
import { Metadata, TokenTarjeta } from '../../Models/Cart/Cargo';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from '../../Services/usuario.service';
import { CarritoService } from '../../Services/carrito.service';
import { Carrito } from '../../Models/Cart/Carrito';
import { LoaderCompraComponent } from '../loader-compra/loader-compra.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AlertasService } from '../../Services/alertas.service';


@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [CommonModule,
  FormsModule,
  ReactiveFormsModule,
  LoaderCompraComponent,
  RouterLink
  ],
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent {

  @Input() monto: number = 0
  @Output() event = new EventEmitter<boolean>()
  public cart = inject(CarritoService)
  private alertas = inject(AlertasService)


  botonSeguridad: boolean = true

  tokentarjeta = new FormGroup({
    tarjeta: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    month: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    year: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)] )
  })

  constructor(private api: ServiceApiService,
    public usuarioservice: UsuarioService,
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
    let cli = this.usuarioservice.usuario();
    let metadata: Metadata = {
      dni: cli.persona.documentoIdentidad
    }
    let mes: number = Number(this.tokentarjeta.value.month)
      let token: TokenTarjeta = {
      card_number: this.tokentarjeta.value.tarjeta || "",
      cvv: this.tokentarjeta.value.cvv || "",
      email: cli.persona.email,
      expiration_month: mes.toString(),
      expiration_year: this.tokentarjeta.value.year || "",
      metadata: metadata
    }
    // let monto = 100
    let monto = this.precioTotalCarro() * 100
    this.botonSeguridad = false
    let resp = await firstValueFrom(this.api.CrearTokenTarjeta(token, monto))
    if(resp != "200"){
      this.closeDialog()
      this.alertas.manejarErroresPago(resp)
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
