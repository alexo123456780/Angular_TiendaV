export interface Usuario
{
    id:number,
    nombre_usuario:string,
    apellido_paterno:string,
    apellido_materno:string,
    numero_telefonico:string,
    direccion:string,
    perfil_usuario:string,
    email:string,
    password:string,
    created_at:string,
    updated_at:string

}

export interface UsuarioResponse
{
    status:boolean,
    message:string,
    data:Usuario,
    code:number,
    token:string

}

export interface UsuarioCredenciales
{
    email:string,
    password:string

}

export interface UsuarioListaResponse
{
    status:boolean,
    message:string,
    data: Usuario[],
    code:number
}



