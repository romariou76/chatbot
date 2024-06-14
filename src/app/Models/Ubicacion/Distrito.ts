import { Provincia } from "./Provincia";

export interface Distrito{
  _id: string | null;
  nombre: string;
  provincia: Provincia;
  ubigeo: string;
}