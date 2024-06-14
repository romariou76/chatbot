import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router'
import { inject } from '@angular/core';

export const autorizacionGuard: CanActivateFn = (route, state) => {


  function ValidarExistenciaToken() {
    try {
      let tok = localStorage.getItem("token")?.toString();
      let t: string = "";

      if (tok != "" || tok != null || tok != undefined) {
        t = tok ?? "undefined";
      }

      if (jwtDecode(t)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false
    }
  }

  let ruta = new Router
  let dato = ValidarExistenciaToken()
  if (dato == false) {
    ruta.navigate(["tienda"])
  }

  return dato;
};
