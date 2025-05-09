import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductoListaResponse, ProductoResponse } from '../interfaces/Producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoServiceService {

  private apiUrl = environment.apiGlobal;

  constructor(private http:HttpClient) { }

  crearProducto(id_admin:number, datos:FormData):Observable<ProductoResponse>{

    return this.http.post<ProductoResponse>(`${this.apiUrl}/crear_producto/${id_admin}`,datos).pipe(

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

  
  obtenerProductos():Observable<ProductoListaResponse>{

    return this.http.get<ProductoListaResponse>(`${this.apiUrl}/traer_productos`).pipe(

      map(response =>{

        console.log(JSON.stringify({status:response.status, message: response.message,  code: response.code},null,3));

        return response;
        
      })

    )
  }











}
