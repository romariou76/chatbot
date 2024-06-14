import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos1Component } from './productos-1/productos-1.component';


@Component({
  selector: 'app-carousel-productos',
  standalone: true,
  imports: [CommonModule, Productos1Component],
  templateUrl: './carousel-productos.component.html',
  styleUrl: './carousel-productos.component.css'
})
export class CarouselProductosComponent {

}
