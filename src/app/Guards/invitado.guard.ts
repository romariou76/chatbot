import { CanActivateFn, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

export const invitadoGuard: CanActivateFn = (route, state) => {

  function ValidarPasoInvitado() {
    try {
      const tok = localStorage.getItem("token")?.toString() || "";
      const decodedToken = jwtDecode(tok);

      return !decodedToken;
    } catch (e) {
      return true;
    }
  }

  const ruta = new Router();
  const dato = ValidarPasoInvitado();
  if (!dato) {
    ruta.navigate(["pasarelaPagos"]);
    return false;
  }

  return true;
};
