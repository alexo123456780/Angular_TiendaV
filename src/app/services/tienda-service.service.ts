import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TiendaListaResponse, TiendaProductosResponse, TiendaResponse, TiendaVentas } from '../interfaces/Tienda';

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


  verProductosTienda(id_tienda:number):Observable<TiendaProductosResponse>{

    return this.http.get<TiendaProductosResponse>(`${this.apiUrl}/productos_tienda/${id_tienda}`).pipe(

      map(response =>{

        console.log('Productos de la tienda obtenidos correctamente',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code,

        },null,3))

        return response;
      })

    )
  }


  verCantidadVentas(tienda_id:number):Observable<TiendaVentas>{

    return this.http.get<TiendaVentas>(`${this.apiUrl}/ver_ventas/${tienda_id}`).pipe(

      map(response =>{

        console.log(JSON.stringify({status:response.status,message:response.message,code:response.code},null,3));

        return response;

      })
    )
  }













}
