import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { UsuarioResponse } from '../interfaces/Usuario';
import { UsuarioCredenciales } from '../interfaces/Usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private apiUrl = environment.apiGlobal;
  
  constructor(private http:HttpClient) { }


  loginUsuario(datos:UsuarioCredenciales):Observable<UsuarioResponse>{

    return this.http.post<UsuarioResponse>(`${this.apiUrl}/login-usuario`,datos).pipe(

      map(response =>{

        console.log('Login exitoso respuesta de la api:',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code
          
        },null,3))

        const token = response.token;
        const data = response.data;

        localStorage.setItem('token_usuarios',token);
        localStorage.setItem('data_usuarios',JSON.stringify(data));

        console.log('Datos guardadods token',token);

        return response;


      })
    )
  }



  registrarUsuario(datos:FormData):Observable<UsuarioResponse>{

    return this.http.post<UsuarioResponse>(`${this.apiUrl}/registro-usuario`,datos).pipe(

      map(response =>{

        console.log('Registro exitoso: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code
        },null,3))

        return response;
      })
    )
  }

























}
