import { Distrito } from "./Distrito";

export interface Sede{
  _id: string | null;
  nombre: string;
  direccion: string;
  telefono: string;
  distrito: Distrito;
}