import { Distrito } from "../Ubicacion/Distrito";
import { TipoDocumentoIdentidad } from './../Users/TipoDocumentoIdentidad';

export interface Persona{
  _id: string | null;
  nombre: string;
  documentoIdentidad: string;
  tipoDocumentoIdentidad: TipoDocumentoIdentidad;
  brevette: string;
  telefono: string;
  email: string;
  direccion: string;
  ubigeo: string;
  genero: string;
  edad: string;
  distrito: Distrito;
}
