import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuestros-productos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './nuestros-productos.component.html',
  styleUrl: './nuestros-productos.component.css'
})
export class NuestrosProductosComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async ngOnInit(){
    this.scrollToTop()
  }

}
