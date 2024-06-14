import { Sede } from "../Ubicacion/Sede";
import { Persona } from "./Persona";

export interface Cliente{
  _id: string | null;
  nombreUsuario: string;
  pass: string;
  fechaRegistro: Date;
  nivel: string;
  sede: Sede;
  persona:Persona;
  terminosCondiciones: boolean

}
