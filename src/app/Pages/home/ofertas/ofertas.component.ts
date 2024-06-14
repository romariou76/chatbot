import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {

}
