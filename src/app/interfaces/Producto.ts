import { Categoria } from "./Categoria"

export interface Producto
{
    id:number,
    nombre_producto:string,
    imagen_producto:string,
    stock:number,
    precio_producto:number,
    descripcion_producto:string,
    numero_ventas:number,
    tienda_id:number,
    categoria_id:number,
    created_at:string,
    updated_at:string,
    categoria:Categoria

}

export interface ProductoResponse
{
    status:boolean,
    message:string,
    data:Producto,
    code:number
}

export interface ProductoListaResponse
{
    status:boolean,
    message:string,
    data:Producto[],
    code:number
}






