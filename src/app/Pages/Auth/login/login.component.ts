import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Users } from '../../../Models/Users/Users';
import { firstValueFrom } from 'rxjs';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
FormsModule,
RouterLink,
ReactiveFormsModule,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginform = new FormGroup({
    correo: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  })

  boton = "Iniciar Sesión"
  usuario: string = ""
  pass: string = ""

  constructor(private ApiLogin: AuthServiceService, private usuarioservice: UsuarioService){}


  async primerclic(dato: string){
    this.boton = dato
  }

  LoginExitosoAlert () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Inicio de sesión con éxito'
    });
  };

  LoginErrorAlert () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Credenciales Incorrectas'
    })
  }

 async onLogin() {
  this.primerclic("Iniciando...")
  let user: Users = {} as Users
  user.nombreUsuario = this.loginform.value.correo || ""
  user.password = this.loginform.value.pass || ""
  let response = await firstValueFrom(this.ApiLogin.Login(user))
  if(response == "400"){
    this.LoginErrorAlert()
    this.primerclic("Iniciar Sesión")

  }else if(response == "503"){
    alert("error del servidor")
  }
  else{
    localStorage.setItem("token", response)
    this.LoginExitosoAlert()
    this.primerclic("Logeado correctamente")
    this.primerclic("Bienvenido")
    this.usuarioservice.GetPerfilUsuario()

  }

}

}
