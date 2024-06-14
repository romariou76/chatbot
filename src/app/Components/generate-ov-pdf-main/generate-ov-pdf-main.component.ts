import { Component, inject } from '@angular/core';
import autoTable, { RowInput } from 'jspdf-autotable';
import { CarritoService } from '../../Services/carrito.service';
import { Carrito } from '../../Models/Cart/Carrito';
import { format } from '@formkit/tempo';
import jsPDF from 'jspdf';
import { PasarelaService } from '../../Pages/pasarela-pagos/pasarela.service';

@Component({
  selector: 'app-generate-ov-pdf-main',
  standalone: true,
  imports: [],
  templateUrl: './generate-ov-pdf-main.component.html',
  styleUrl: './generate-ov-pdf-main.component.css'
})
export class GenerateOvPdfMainComponent {

  public service = inject(PasarelaService)
  private _cartServices = inject(CarritoService)
  cartProductList = this._cartServices.carro()
  date = new Date()

  generar(){

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const logo = new Image();
    logo.src = 'assets/logos/logoupgradeazul.png';
    const logoWidth = 60;
    const logoHeight = 18;
    const logoX = 15;
    const logoY = 12;
    doc.addImage(logo, 'PNG', logoX, logoY, logoWidth , logoHeight );

    // TEXTO DESPUES DEL LOGO
    doc.setFontSize(7)
    doc.text('GRUPO UPGRADE S.A.C.', 15, 34 )
    doc.text('Mza. B Lt.4 Urb Magisterial (Ovalo Quiñones)', 15, 37 )
    doc.text('YANAHUARA - AREQUIPA - AREQUIPA', 15, 40 )
    doc.text('https://upgrade.com.pe', 15, 43 )

    doc.setFontSize(9)

    // CUADRO 1
    doc.setLineWidth(0.1);
    doc.setDrawColor(128);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(136, 12, 60, 29, 2, 2, 'FD');
    doc.setFontSize(12)
    doc.setFont('Helvetica', 'bold')
    doc.text(`RUC 20454043660`, 165, 19, {align: 'center'})
    doc.setFontSize(13)
    doc.text(`COMPROBANTE DE`, 165, 25, {align: 'center'} )
    doc.text(`COMPRA ONLINE`, 165, 31, {align: 'center'} )
    doc.setFontSize(12)
    doc.text(`00` + this.service.numberOrder(), 165, 37 , {align: 'center'})

    //=================== CUADRO DATOS DEL CLIENTE============
    doc.setFontSize(8)
    doc.setLineWidth(0.1);
    doc.setDrawColor(128);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(14, 50, 90, 25, 2, 2, 'S');
    // ========================================================
    doc.setFontSize(7)
    doc.text(`DATOS DEL CLIENTE`, 16, 54 )
    doc.text(`DNI`, 16, 58 )
    doc.text(`DENOMINACION`, 16, 61 )
    doc.text(`TELEFONO`,16, 64 )
    doc.text('CORREO',16, 67 )

    doc.setFont('Helvetica', '')
    doc.text(': '+this.service.dni(), 48, 58 )
    doc.text(': '+ this.service.nombre() , 48, 61 )
    doc.text(': '+ this.service.telefono(),48, 64 )
    doc.text(': '+ this.service.email() ,48, 67 )

    // CUADRO DATOS ENVIO ENTREGA
    doc.setLineWidth(0.1);
    doc.setDrawColor(128);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(105, 50, 90, 25, 2, 2, 'S');

    doc.setFontSize(7); doc.setFont('Helvetica', 'bold')

    doc.text(`DATOS DE COMPRA`, 107, 54 )
    doc.text(`FECHA EMISIÓN`, 107, 58 )

    if(this.service.tiendaEntrega() === ""){
      doc.text(`DEPARTAMENTO`, 107, 61 )
      doc.text(`PROVINCIA`, 107, 64 )
      doc.text(`DISTRITO`,107, 67 )
      doc.text('DIRECCION',107, 70 )
    } else {
      doc.text('TIENDA ENTREGA',107, 73 )
    }

    if(this.service.tiendaEntrega() === ""){
      doc.setFont('Helvetica', '')
      doc.text(': '+ this.getDate(), 140, 58 )
      doc.text(': '+ this.service.departamento().nombre , 140, 61 )
      doc.text(': '+ this.service.provincia().nombre , 140, 64 )
      doc.text(': '+ this.service.distrito().nombre , 140, 67 )
      doc.text(': '+ this.service.direccion() , 140, 70 )
    } else {
      doc.setFont('Helvetica', '')
      doc.text(': '+ this.getDate(), 140, 58 )
      doc.text(': '+ this.service.tiendaEntrega(), 140, 73 )
    }

    let cartData: any[] = []

    // TABLA 3 DETALLES DE LOS PEDIDOS
    for(let data of this.cartProductList){
      let obj: any = {
        cantidad: data.cantidad || "",
        codigo: data.producto.codigo || "",
        descripcion: data.producto.nombreEcommerce || "",
        precio: data.producto.precioPromocionEcommerce.toFixed(2) || "",
        total: (data.producto.precioPromocionEcommerce * data.cantidad).toFixed(2) || ""
      }
      cartData.push(obj)
    }

    let body: RowInput[] = cartData.map(bien => Object.values(bien) as RowInput);

    let lastTablePosition = { x: 0, y: 0, NumeroPagina: 1 };
    autoTable(doc, {
      head: [['CANTIDAD', 'CÓDIGO', 'DESCRIPCIÓN', 'P/U', 'TOTAL']],
      body: body,
      bodyStyles: {fontSize: 7},
      headStyles: {
        fontSize: 7,
        fillColor: "#e6e6e6",
        lineColor: "#8b8b8b",
        lineWidth: 0.1,
        // halign: 'center',
        // valign: 'middle',
        textColor: '#444444'
      },
      showHead: 'firstPage',
      theme: 'striped',
      startY: 77,
      didDrawPage: (hookData) => {
        if (!hookData.cursor) {
          hookData.cursor = { x: 0, y: 20 };
        }
        lastTablePosition = {
          x: hookData.cursor.x,
          y: hookData.cursor.y,
          NumeroPagina: hookData.pageNumber
        };
      },
    });

    // PRECIO TOTAL
    doc.setFont('Helvetica', 'bold')
    doc.text('TOTAL         S/          ' + this.getTotalCartPrice() ,196, lastTablePosition.y + 10, {align: 'right'} )

    doc.save("comprobante.pdf");

  }

  getTotalCartPrice() {
    let carro = this._cartServices.carro();
    let tot: number = 0;
    for (let car of carro) {
      tot += this.getTotalUnitCartPrice(car);
    }
    return tot.toFixed(2);
  }

  getTotalUnitCartPrice(carro: Carrito) {
    if (carro.producto.precioPromocionEcommerce != 0) {
      return carro.producto.precioPromocionEcommerce * carro.cantidad;
    } else {
      return carro.producto.precioEcommerce * carro.cantidad;
    }
  }

  getDate(){
    const l = "en"
    const t = new Date()
    let fecha = format(t, "DD/MM/YYYY", l)
    return fecha;
  }

}
