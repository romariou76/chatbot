import { Empleado } from "./Empleado";
import { ClienteER } from "./Cliente"
import { Moneda } from "./Moneda"
import {Venta } from "./Venta"
import { Impuesto } from "./Impuesto"
import { FormaDePago } from "./FormaDePago"
import { Almacen } from "./Almacen";
import { NotaPedidoDetalle } from './NotaPedidoDetalle';

export interface NotaPedido {
  _id: string | null;
  fecha: Date;
  vendedor: Empleado;
  cliente: ClienteER;
  moneda: Moneda;
  venta: Venta
  impuesto: Impuesto;
  numero: number;
  observacion: string;
  aprobado: boolean;
  aprobadoCredito: string;
  fechaEntrega: Date;
  montoCobrar: number;
  montoCobrado: number;
  totalMinimo: number;
  subtotal: number;
  total: number;
  notaPedidoDetalle: NotaPedidoDetalle[];
  formaDePago: FormaDePago;
  utilidad: number;
  almacen: Almacen;
  descargado: boolean;
}
