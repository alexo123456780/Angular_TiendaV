import { Tienda } from "./Tienda"

export interface Administrador
{
    id:number,
    nombre_administrador:string,
    apellido_paterno:string,
    apellido_materno:string,
    numero_telefonico:string,
    perfil:string,
    email:string,
    password:string,
    tienda_id:number,
    created_at:string,
    updated_at:string
    tienda:Tienda,
}


export interface AdministradorResponse
{
    status:boolean,
    message:string,
    data:Administrador,
    code:number,
    token:string
}

export interface AdministradorCredenciales
{
    email:string,
    password:string
}

export interface PasswordNuevo
{
    password:string
}