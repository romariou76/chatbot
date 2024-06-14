import { Component } from '@angular/core';

@Component({
  selector: 'app-productos-recomendados',
  standalone: true,
  imports: [],
  templateUrl: './productos-recomendados.component.html',
  styleUrl: './productos-recomendados.component.css'
})
export class ProductosRecomendadosComponent {

  selectedTab = 'lo-mas-nuevo';
  // especificaciones: EspecificacionesProducto[] = []
  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

}
