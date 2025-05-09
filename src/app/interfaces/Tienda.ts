import { Producto } from "./Producto"

export interface Tienda
{
    id:number,
    nombre_tienda:string,
    logo_tienda:string,
    descripcion:string,
    direccion_web:string,
    numero_telefonico:string,
    direccion:string,
    created_at:string,
    updated_at:string
    productos:Producto[]

}

export interface TiendaResponse
{
    status:boolean,
    message:string,
    data:Tienda,
    code:number

}


export interface TiendaProductosResponse{

    status:boolean,
    message:string,
    data:Producto[],
    code:number,
}



export interface TiendaListaResponse
{
    status:boolean,
    message:string,
    data:Tienda[],
    code:number
}


export interface TiendaVentas{

    status:boolean,
    message:string,
    numero_ventas:number,
    code:number

}


