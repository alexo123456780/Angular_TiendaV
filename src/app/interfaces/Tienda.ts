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
}

export interface TiendaResponse
{
    status:boolean,
    message:string,
    data:Tienda,
    code:number

}

export interface TiendaListaResponse
{
    status:boolean,
    message:string,
    data:Tienda[],
    code:number
}