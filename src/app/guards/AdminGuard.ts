import { Inject, inject } from "@angular/core";
import { Router } from "@angular/router";


export const AdminGuard = () =>{

    const token = localStorage.getItem('token_admin');

    const router = inject(Router);


    if(!token){

      console.log('Necesitas iniciar sesion para acceder a este panel');
      
      router.navigate(['/login/administrador']);

      return false;

    }

    return true;


}


