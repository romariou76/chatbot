import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-ofertas-novedades',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './ofertas-novedades.component.html',
  styleUrl: './ofertas-novedades.component.css'
})
export class OfertasNovedadesComponent {
  // ofertaPrincipal
  imagen1 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-1.webp';
  imagen2 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-2.webp';
  imagen3 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-3.webp';
  imagen4 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-4.webp';
  imagen5 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-5.webp';

  imagen6 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-6.webp';
  imagen7 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-7.webp';
  imagen8 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-8.webp';
  imagen9 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-9.webp';
  imagen10 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-10.webp';

  imagen11 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-11.webp';
  imagen12 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-12.webp';
  imagen13 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-13.webp';
  imagen14 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-14.webp';
  imagen15 = 'https://imagenes.upgrade.com.pe/Banners/BENTO-15.webp';



  imageData: { [key: string]: string[] } = {
    ofertaTemporada: [
      this.imagen1,
      this.imagen2,
      this.imagen3,
      this.imagen4,
      this.imagen5
    ],
    laptops: [
      this.imagen6,
      this.imagen7,
      this.imagen8,
      this.imagen9,
      this.imagen10,
    ],
    impresoras: [
      this.imagen11,
      this.imagen12,
      this.imagen13,
      this.imagen14,
      this.imagen15

    ],

  };

  selectedCategory: string;

  constructor() {
    this.selectedCategory = 'ofertaTemporada';
  }

  ngOnInit() {
    // ...
  }

  changeImages(category: string) {
    this.selectedCategory = category;
  }
}
