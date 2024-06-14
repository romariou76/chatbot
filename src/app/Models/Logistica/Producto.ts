// import { Impuesto } from "../Finanzas/Impuesto"
// import { Moneda } from "../Finanzas/Moneda"
import { Impuesto } from "../NotaPedido/Impuesto"
import { Moneda } from "../NotaPedido/Moneda"
import { EventoProducto } from "./EventoProducto"
import { Linea } from "./Linea"
import { Marca } from "./Marca"
import { Unidad } from "./Unidad"

export interface Producto {
  _id: null |string
  codigo: string
  cantidad?: number; // Campo de cantidad (opcional)
  nombre: string
  descripcion: string
  regalo: boolean
  servicio: boolean
  productoTipo: string
  unidad: Unidad
  marca: Marca
  linea: Linea
  peso: number
  garantia: number
  codigoSunat: string
  precio: number
  moneda: Moneda
  impuesto: Impuesto
  urlimagen: string
  precioEcommerce: number
  activoEcommerce: boolean
  precioPromocionEcommerce: number
  nombreEcommerce: string
  evento: EventoProducto
}

export interface ProductoDto{
  _id: string | null
  codigo: string
  nombre: string
}
