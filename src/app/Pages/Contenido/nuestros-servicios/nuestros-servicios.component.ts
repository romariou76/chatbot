import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuestros-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nuestros-servicios.component.html',
  styleUrl: './nuestros-servicios.component.css'
})
export class NuestrosServiciosComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async ngOnInit(){
    this.scrollToTop()
  }

}
