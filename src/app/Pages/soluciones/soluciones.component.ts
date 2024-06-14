import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-soluciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './soluciones.component.html',
  styleUrl: './soluciones.component.css'
})
export class SolucionesComponent {
  img1 = 'assets/img/img-1.png'
  marca1= 'assets/img/marca-1.png'
  marca2= 'assets/img/marca-2.png'
  marca3= 'assets/img/marca-3.png'
  marca4= 'assets/img/marca-4.png'

  ngOnInit(): void {
    const copy = document.querySelector<HTMLElement>(".logos-slide")?.cloneNode(true);
    const logosContainer = document.querySelector<HTMLElement>(".logos");

    if (copy && logosContainer) {
      logosContainer.appendChild(copy);
    }
  }

}
