import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cambiar-vista-productos',
  standalone: true,
  imports: [],
  templateUrl: './cambiar-vista-productos.component.html',
  styleUrl: './cambiar-vista-productos.component.css'
})
export class CambiarVistaProductosComponent {

  @Input() BotonInicial: string = ''; // Puedes ajustar el tipo según sea necesario
  @Input() BotonLista: string = '';

  @Output() restaurarEstadoClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() cambiarClaseClick: EventEmitter<void> = new EventEmitter<void>();

  restaurarEstado(): void {
    this.restaurarEstadoClick.emit();
  }

  cambiarClase(): void {
    this.cambiarClaseClick.emit();
  }

  ngOnInit(): void {
    // Lógica de inicialización si es necesaria
  }

}
