import { Departamento } from "./Departamento";

export interface Provincia{
  _id: string | null;
  nombre: string;
  departamento: Departamento;
  ubigeo: string;
}