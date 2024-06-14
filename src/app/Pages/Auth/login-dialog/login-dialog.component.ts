import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, firstValueFrom } from 'rxjs';
import { Users } from '../../../Models/Users/Users';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
    private ApiLogin: AuthServiceService,
    private usuarioservice: UsuarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
  }

  loginform = new FormGroup({
    correo: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  })

  boton = "Iniciar Sesión"
  usuario: string = ""
  pass: string = ""
  isInvitado: boolean = false

  verifyIsInvitado(){
    if(this.data === 1111){
      this.isInvitado = true;
    }
  }

  async primerclic(dato: string){
    this.boton = dato
  }

  LoginExitosoAlert () {
    this.router.navigate([""])
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
    }
  );



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
    this.dialogRef.close()
  }
}

ngOnInit(){
  this.verifyIsInvitado()
}

}
