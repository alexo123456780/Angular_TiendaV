import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoServiceService } from '../../../services/producto-service.service';
import { CategoriaServiceService } from '../../../services/categoria-service.service';
import { UsuarioServiceService } from '../../../services/usuario-service.service';
import { Producto } from '../../../interfaces/Producto';
import { Categoria } from '../../../interfaces/Categoria';
import { Usuario } from '../../../interfaces/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-usuario',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})



export class DashboardUsuarioComponent implements OnInit {

  mensajeExito : string = '';
  mensajeError : string = '';
  productos : Producto[] = [];
  categorias : Categoria[] = [];
  productosFiltrados : Producto[] = [];
  busqueda: string = '';
  categoriaSeleccionada : number | null = null;
  usuario: Usuario | null = null;
  id_usuario: number | null = null;

  constructor(private productoService:ProductoServiceService, private categoriaService:CategoriaServiceService, private router: Router,
    private usuarioService:UsuarioServiceService

  ){}

  ngOnInit(): void {
    
    this.obtenerIdUsuario()
    this.obtenerProductos();
    this.obtenerCategorias();
    
    
  }


  limpiarMensajes():void{

    if(this.mensajeExito) setTimeout(() => {this.mensajeExito = ''},1400);
    if(this.mensajeError)  setTimeout(() => {this.mensajeError = ''},1400);

  }

  obtenerIdUsuario():void{

    this.id_usuario = this.usuarioService.obtenerIdUsuario();
    this.obtenerInfoUsuario();

  }



  obtenerProductos():void{

    this.productoService.obtenerProductos().subscribe({

      next: (response) =>{

        if(response.data && response.data !== undefined){

          const productosNuevos = response.data;

          if(productosNuevos.length === 0){

            this.mensajeExito = 'Aun no hay productos disponibles';
            this.limpiarMensajes();
          }

          this.productos = [...productosNuevos];
          this.productosFiltrados = [...productosNuevos];


        }
      },

      error : (error) =>{

        this.mensajeError = 'Error al obtener los productos'
        console.log(JSON.stringify(error,null,3));

        this.limpiarMensajes();
      }
    })
  }

  obtenerCategorias():void{

    this.categoriaService.obtenerCategorias().subscribe({

      next : (response) =>{

        if(response.data && response.data !== undefined){

          const allCategorias = response.data;

          if(allCategorias.length === 0){

            this.mensajeExito = 'Aun no hay categorias disponibles';
            this.limpiarMensajes();
          }

          this.categorias = [...allCategorias];

        }
      },

      error: (error) =>{

        this.mensajeError = 'Error al cargar las categorias';
        console.log(JSON.stringify(error,null,3));
      }

    })
  }


  obtenerInfoUsuario():void{

    if(this.id_usuario){

      this.usuarioService.obtenerInfoUsuario(this.id_usuario).subscribe({

        next : (response) =>{

          if(response.data && response.data !== undefined){

            this.usuario = response.data;
            console.log(this.usuario);

          }else{

            console.log('Error al obtener la informacion del usuario');
          }

        },

        error : (error) =>{

          console.log(JSON.stringify(error,null,3));
        }

      })
    }

  }





  metodoBusqueda(event: Event):void{

    const inputBusqueda = (event.target as HTMLInputElement)?.value;

    if(inputBusqueda){

      this.busqueda = inputBusqueda;

      this.busqueda = '';

      this.filtrosSeleccion();
    }
  }

  filtradoCategorias(id_categoria:number):void{

    this.categoriaSeleccionada = id_categoria;
    this.filtrosSeleccion();

  }

  

  filtrosSeleccion():void{

    let productosFiltros = [...this.productos];

    if(this.busqueda){

     productosFiltros.filter((producto) => producto.nombre_producto.toLowerCase().includes(this.busqueda.toLowerCase())||

     producto.descripcion_producto.toLowerCase().includes(this.busqueda.toLowerCase())
    )

    }

    if(this.categoriaSeleccionada){

      productosFiltros.filter((producto) => producto.categoria_id === this.categoriaSeleccionada);

    }

    this.productosFiltrados = productosFiltros;

  }


  cerrarSesion():void{

    localStorage.removeItem('token_usuarios');
    localStorage.removeItem('data_usuarios');

    this.router.navigate(['/login/usuario'])

  }














}
