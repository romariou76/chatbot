import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  AlertError(titles: string, texts: string){
    Swal.fire({
      icon: 'error',
      title: titles,
      text: texts,
      showConfirmButton: false,
      timer: 1500
    });
  }

  AlertSuccess(titles: string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: titles,
      showConfirmButton: false,
      timer: 1500
    })
  }


}

