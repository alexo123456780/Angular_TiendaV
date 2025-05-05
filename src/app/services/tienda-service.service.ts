import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TiendaListaResponse } from '../interfaces/Tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaServiceService {

  private apiUrl = environment.apiGlobal;

  constructor(private http:HttpClient) { }


  verTiendas():Observable<TiendaListaResponse>{

    return this.http.get<TiendaListaResponse>(`${this.apiUrl}/ver-tiendas`).pipe(

      map(response =>{

        console.log('Peticion exitosa:  ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code
        },null,3))

        return response;
      })
    )
  }





}
