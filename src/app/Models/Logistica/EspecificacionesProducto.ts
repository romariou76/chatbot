import { ProductoDto } from "./Producto";

export interface EspecificacionesProducto{
  _id: string | null;
  producto: ProductoDto
  especificaciones: Especificacion[]
}

export interface Especificacion{
  nombre: string
  descripcion: string
}



