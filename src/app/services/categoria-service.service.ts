import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaListaResponse } from '../interfaces/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  private apiUrl = environment.apiGlobal;

  constructor(private http:HttpClient) { }

  obtenerCategorias():Observable<CategoriaListaResponse>{

    return this.http.get<CategoriaListaResponse>(`${this.apiUrl}/categorias`).pipe(

      map(response =>{

        console.log(JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code
        },null,3))

        return response;

      })

    )
  }








}
