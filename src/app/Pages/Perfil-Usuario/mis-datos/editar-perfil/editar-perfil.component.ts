import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../../../Models/Users/Cliente';


@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {

  cliente: Cliente = {} as Cliente;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.cliente = data.componentePadre;
  }



}
