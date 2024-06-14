import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ofertas-secondary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ofertas-secondary.component.html',
  styleUrl: './ofertas-secondary.component.css'
})
export class OfertasSecondaryComponent {

}
