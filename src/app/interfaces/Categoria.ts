export interface Categoria
{
    id:number,
    nombre:string,
    imagen:string,
    descripcion:string,
    created_at:string,
    updated_at:string
}


export interface CategoriaResponse
{
    status:boolean,
    message:string,
    data:Categoria,
    code:number,
}

export interface CategoriaListaResponse
{
    status:boolean,
    message:string,
    data:Categoria[],
    code:number,
}




