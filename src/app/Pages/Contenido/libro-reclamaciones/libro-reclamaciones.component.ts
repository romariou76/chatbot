import { Component } from '@angular/core';
import { SelectDepartamentoComponent } from '../../../global/select-departamento/select-departamento.component';
import { SelectProvinciaComponent } from '../../../global/select-provincia/select-provincia.component';

@Component({
  selector: 'app-libro-reclamaciones',
  standalone: true,
  imports: [
    SelectDepartamentoComponent,
    SelectProvinciaComponent,
    SelectProvinciaComponent
  ],
  templateUrl: './libro-reclamaciones.component.html',
  styleUrl: './libro-reclamaciones.component.css'
})
export class LibroReclamacionesComponent {

}
