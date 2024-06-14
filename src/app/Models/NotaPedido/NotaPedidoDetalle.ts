import { Producto } from "../Logistica/Producto";

export interface NotaPedidoDetalle {
  _id: string | null;
  regalo: boolean;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  cantidadEntregado: number;
}
