import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AdministradorResponse } from '../interfaces/Administrador';
import { AdministradorCredenciales } from '../interfaces/Administrador';
import { PasswordNuevo } from '../interfaces/Administrador';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private apiUrl = environment.apiGlobal;

  constructor(private http:HttpClient) { }


  loginAdministrador(credenciales:AdministradorCredenciales):Observable<AdministradorResponse>{

    return this.http.post<AdministradorResponse>(`${this.apiUrl}/login-admin`,credenciales).pipe(

      map(response =>{

        console.log('Login exitoso: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        },null,3))

        const token = response.token;
        const data = response.data;

        localStorage.setItem('token_admin',token);
        localStorage.setItem('data_admin',JSON.stringify(data));

        console.log('Token y datos guardados correctamente',token);

        return response;
      })
    )
  }


  registroAdministrador(datos:FormData):Observable<AdministradorResponse>{

    return this.http.post<AdministradorResponse>(`${this.apiUrl}/registro-admin`,datos).pipe(

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

  infoAdmin(id_admin:number):Observable<AdministradorResponse>{

    return this.http.get<AdministradorResponse>(`${this.apiUrl}/info_admin/${id_admin}`).pipe(

      map(response =>{

        console.log('Info del admin obtenida correctamente: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        },null,3))

        return response;

      })

    )
  }

  obtenerIdAdmin():number | null{

    const infoAdmin = localStorage.getItem('data_admin');

    if(infoAdmin){

      const dataAdmin = JSON.parse(infoAdmin);

      if(dataAdmin && typeof dataAdmin.id === 'number'){

        return Number(dataAdmin.id)
      }

      return null;

    }

    return null;

  }


  editarPerfilAdmin(datos:FormData, id_admin:number):Observable<AdministradorResponse>{

    return this.http.post<AdministradorResponse>(`${this.apiUrl}/actualizar_info/${id_admin}`,datos).pipe(

      map(response =>{

        console.log(JSON.stringify({status:response.status,message:response.message,code:response.code},null,3));

        return response;

      })
    )
  }

  cambiarPasswordAdmin(password:PasswordNuevo, id_admin:number):Observable<AdministradorResponse>{

    return this.http.put<AdministradorResponse>(`${this.apiUrl}/actualizar_password_admin/${id_admin}`,password).pipe(

      map(response =>{

        console.log(JSON.stringify({status:response.status,message:response.message,code:response.code},null,3));

        return response;
        
      })
    )

  }


  




















}
