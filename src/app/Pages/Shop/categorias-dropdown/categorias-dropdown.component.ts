import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias-dropdown.component.html',
  styleUrl: './categorias-dropdown.component.css'
})
export class CategoriasDropdownComponent {



  // @Input() productosPorCategoria: (categoria: string) => void = () => {};

  @Input() ProductosPorCategoria?: (categoria: string) => void;

}