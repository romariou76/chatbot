import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-beneficios-upgrade',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './beneficios-upgrade.component.html',
  styleUrl: './beneficios-upgrade.component.css'
})
export class BeneficiosUpgradeComponent {
  currentImageUrl: string = 'https://imagenes.upgrade.com.pe/Banners/BENEFICIOS-1.webp';

  changeImage(newImageUrl: string) {
    this.currentImageUrl = newImageUrl;
  }
}
