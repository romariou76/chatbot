import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuestras-tiendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nuestras-tiendas.component.html',
  styleUrl: './nuestras-tiendas.component.css'
})
export class NuestrasTiendasComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(){
    this.scrollToTop()
  }

}