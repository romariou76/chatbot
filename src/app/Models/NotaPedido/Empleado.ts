import { RolDeUsuario } from "./RolDeUsuario";
import { Almacen } from "./Almacen";
import { Persona } from "./Persona"

export interface Empleado {
  _id: string | null;
  activo: boolean,
  nombreUsuario: string,
  password: string,
  fechaRegistro: Date,
  rolDeUsuario: RolDeUsuario,
  nivel: string,
  almacen: Almacen,
  emailCorporativo: string,
  persona: Persona,
};