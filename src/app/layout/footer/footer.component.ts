import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,
  RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  tokenExiste: boolean = false;

  constructor(  private ApiLogin: AuthServiceService){}

  ngOnInit(){
    this.tokenExiste = this.ApiLogin.ValidarExistenciaToken();
  }
  

}
