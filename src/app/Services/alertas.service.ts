import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  alertaExitosa( mensaje: string) {
    Swal.fire({
      title: mensaje,
      icon: 'success',
    });
  }

  alertError(mensaje: string, text:string){
    Swal.fire({
      title: mensaje,
      icon: 'error',
      text: text,
    });
  }


  CarritoVacio() {
    Swal.fire({
      icon: 'error',
      title: 'Oops..',
      text: 'Su carrito de compras está vacío. Por favor, agregue productos para continuar con la compra.',
    });
  }

  alertaFallida(mensaje: string){
    Swal.fire({
      title: mensaje,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }

  alertaFallida2(title: string, mensaje: string){
    Swal.fire({
      title: title,
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }

  alertaError2(mensaje: string){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: mensaje
    });
  }

  alertaUps(mensaje: string){
    Swal.fire({
      title: '¡Ups',
      icon: 'error',
      text: mensaje,
      confirmButtonText: 'Aceptar',
    });
  }

  manejarErroresPago(errorCode: string) {
    switch (errorCode) {
      case 'expired_card':
        this.alertaFallida("Tarjeta vencida. La tarjeta está vencida o la fecha de vencimiento ingresada es incorrecta.");
        break;
      case 'stolen_card':
        this.alertaFallida("Tarjeta robada. La tarjeta fue bloqueada y reportada al banco emisor como una tarjeta robada.");
        break;
      case 'lost_card':
        this.alertaFallida("Tarjeta perdida. La tarjeta fue bloqueada y reportada al banco emisor como una tarjeta perdida.");
        break;
      case 'insufficient_funds':
        this.alertaFallida("Fondos insuficientes. La tarjeta no tiene fondos suficientes para realizar la compra.");
        break;
      case 'contact_issuer':
        this.alertaFallida("Contactar emisor. La operación fue denegada por el banco emisor de la tarjeta y el cliente necesita contactarse con la entidad para conocer el motivo.");
        break;
      case 'invalid_cvv':
        this.alertaFallida("CVV inválido. El código de seguridad (CVV2, CVC2, CID) de la tarjeta es inválido.");
        break;
      case 'incorrect_cvv':
        this.alertaFallida("CVV incorrecto. El código de seguridad (CVV2, CVC2, CID) de la tarjeta es incorrecto.");
        break;
      case 'too_many_attempts_cvv':
        this.alertaFallida("Exceso CVV. El cliente ha intentado demasiadas veces ingresar el código de seguridad (CVV2, CVC2, CID) de la tarjeta.");
        break;
      case 'issuer_not_available':
        this.alertaFallida("Emisor no disponible. El banco que emitió la tarjeta no responde. El cliente debe realizar el pago nuevamente.");
        break;
      case 'issuer_decline_operation':
        this.alertaFallida("Operación denegada. La operación fue denegada por el banco emisor de la tarjeta por una razón desconocida.");
        break;
      case 'invalid_card':
        this.alertaFallida("Tarjeta inválida. La tarjeta utilizada tiene restricciones para este tipo de compras. El cliente necesita contactarse con el banco emisor para conocer el motivo de la denegación.");
        break;
      case 'processing_error':
        this.alertaFallida("Error de procesamiento. Ocurrió un error mientras procesábamos la compra. Para brindarte una solución, contáctate con nosotros en: culqi.com/soporte.");
        break;
      case 'fraudulent':
        this.alertaFallida("Operación fraudulenta. El banco emisor de la tarjeta sospecha que se trata de una compra fraudulenta.");
        break;
      case 'culqi_card':
        this.alertaFallida("Tarjeta Culqi. Estás utilizando una de las tarjetas de prueba de Culqi para realizar una compra real.");
        break;
      default:
        this.alertaFallida("Error desconocido. Por favor, inténtelo de nuevo o contacte al soporte.");
        break;
    }
  }

}
