import { Sede } from "../Ubicacion/Sede";

export interface Almacen {
  _id: string | null
  sede: Sede
  nombre: string
  telefono: string
  abreviatura: string
};
