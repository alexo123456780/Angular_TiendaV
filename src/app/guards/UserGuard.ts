import { Inject,inject } from "@angular/core";
import { Router } from "@angular/router";

 export const userGuard = () =>{

    const token = localStorage.getItem('token_usuarios');
    const router = inject(Router);

    if(!token){

        console.log('Inicia sesion antes de entrar a esta seccion');
        router.navigate(['/login/usuario']);

        return false;

    }

    return true;


}


