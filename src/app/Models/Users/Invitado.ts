import { Persona } from "./Persona";

export interface Invitado {
  _id: string | null;
  nombreUsuario: string;
  pass: string;
  fechaRegistro: Date;
  nivel: string;
  persona:Persona;
  terminosCondiciones: boolean
}
