import { Pais } from "./Pais";

export interface Departamento{
  _id: string | null;
  nombre: string;
  pais: Pais;
  ubigeo: string;
}