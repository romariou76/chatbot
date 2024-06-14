import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-como-comprar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './como-comprar.component.html',
  styleUrl: './como-comprar.component.css'
})
export class ComoComprarComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(){
    this.scrollToTop()
  }

}