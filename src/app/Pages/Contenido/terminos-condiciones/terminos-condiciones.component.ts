import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [CommonModule, MatDialogContent, FormsModule],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async ngOnInit(){
    this.scrollToTop()
  }

}
