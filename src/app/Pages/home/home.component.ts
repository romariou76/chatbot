import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OfertasComponent } from './ofertas/ofertas.component';
import { OfertasSecondaryComponent } from './ofertas-secondary/ofertas-secondary.component';
import { SuscribeteSectionComponent } from './suscribete-section/suscribete-section.component';
import { CarouselProductosComponent } from '../Shop/carousel-productos/carousel-productos.component';
import { OfertasNovedadesComponent } from './ofertas-novedades/ofertas-novedades.component';
import { ProductosRecomendadosComponent } from './productos-recomendados/productos-recomendados.component';
import { BeneficiosUpgradeComponent } from './beneficios-upgrade/beneficios-upgrade.component';
import { Productos1Component } from '../Shop/carousel-productos/productos-1/productos-1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
  CommonModule,
    RouterLink,
    OfertasComponent,
    BeneficiosUpgradeComponent,
    OfertasSecondaryComponent,
    SuscribeteSectionComponent,
    CarouselProductosComponent,
    Productos1Component,
    OfertasNovedadesComponent,
    ProductosRecomendadosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async ngOnInit(){
    this.scrollToTop()
  }

}
