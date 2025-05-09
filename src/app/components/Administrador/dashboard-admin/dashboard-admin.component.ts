import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { TiendaServiceService } from '../../../services/tienda-service.service';
import { UsuarioServiceService } from '../../../services/usuario-service.service';
import { Usuario } from '../../../interfaces/Usuario';
import { Producto } from '../../../interfaces/Producto';
import { Administrador } from '../../../interfaces/Administrador';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-dashboard-admin',
  standalone:true,
  imports: [AvatarModule,TabViewModule,ButtonModule,InputTextModule,FormsModule,MenuModule,SidebarModule,TagModule
    ,TableModule
    ,CommonModule
    ,RouterModule

  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})


export class DashboardAdminComponent implements OnInit {

  estaCargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  administrador : Administrador | null = null;
  id_admin: number | null = null;
  id_tienda: number | null = null;
  productos: Producto[] = [];
  usuarios: Usuario[] = [];
  cantidad_usuarios: number | null = null;
  cantidad_productos: number | null = null;
  cantidad_ventas : number | null = null;
  
  opcionesMenu = 
  [

    {
      label: 'Configuracion',
      items:
      [
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          command: () =>{

            this.rutaPerfil();
          }
        },

        {
           label: 'Password',
           icon: 'pi pi-unlock',

           command: () =>{
            this.rutaPasswordNuevo();
           }

        },

        {
          separator:true,

        },

        {
          label: 'Cerrar Sesion',
          icon: 'pi pi-sign-out',
          command: () =>{

            this.cerrarSesion();
          }
        }

      ]
    }

  ]



  constructor(private adminService:AdminServiceService,private router:Router,private tiendaService:TiendaServiceService, private usuarioService:UsuarioServiceService){}

  ngOnInit(): void {

    this.obtenerIdAdmin();
    this.obtenerUsuarios();
    
  }

  limpiarMensajes():void{

    if(this.mensajeExito){

      setTimeout(() =>{
        this.mensajeExito = '';

      },1400)

    }

    if(this.mensajeError){

      setTimeout(() =>{

        this.mensajeError = '';

      },1400)
    }

  }




  obtenerIdAdmin():void{

    this.id_admin = this.adminService.obtenerIdAdmin();
    this.obtenerInfoAdmin();



  }

  obtenerInfoAdmin():void{

    if(this.id_admin){

      this.adminService.infoAdmin(this.id_admin).subscribe({

        next: (response) =>{

          console.log('Info del admin buscada correctamente');

          this.administrador = response.data;

          this.id_tienda = this.administrador.tienda_id;

          this.obtenerProductosTienda();
          this.obtenerNumeroVentas();

          console.log(this.administrador);

        },

        error: (error) =>{

          console.log('Error al obtener el info del admin',JSON.stringify(error,null,3));
        }
      })
    }
  }

  obtenerUsuarios():void{

    this.usuarioService.verUsuarios().subscribe({

      next: (response) =>{

        if(response.data && response.data !== undefined){

          const UsuariosGlobales = response.data;

          if(UsuariosGlobales.length === 0){

            this.cantidad_usuarios = 0;
          }

          this.usuarios = [...UsuariosGlobales];


          this.cantidad_usuarios = this.usuarios.length;

        }

      },

      error: (error) =>{

        this.mensajeError = 'Error al obtener los usuarios';
        console.log(JSON.stringify(error,null,3));

        this.limpiarMensajes();

      }
    })
  }


  obtenerProductosTienda():void{

    if(this.id_tienda){

      this.estaCargando = true

      this.tiendaService.verProductosTienda(this.id_tienda).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          if(response && response.data !== undefined){

            const datosProductos = response.data;

            if(datosProductos.length === 0){
              
              this.estaCargando = false;
              this.mensajeExito = 'Aun no hay productos registrados';

              this.limpiarMensajes();
            }

            this.mensajeExito = 'Productos obtenidos correctamente';
            this.productos = [...datosProductos];

            this.cantidad_productos = this.productos.length;

            console.log(this.productos);

            this.limpiarMensajes();

          }else{

            this.estaCargando = false;
            this.mensajeError = 'Error al cargar los productos intentelo mas tarde';

            this.limpiarMensajes();

          }

        },

        error: (error) =>{
          this.estaCargando = false;
          this.mensajeError = 'Error al obtener los productos';

          console.log('Error detallado',JSON.stringify(error,null,2));

          this.limpiarMensajes();


        }
      })

    }

  }


  obtenerNumeroVentas():void{

    if(this.id_tienda){

      this.tiendaService.verCantidadVentas(this.id_tienda).subscribe({

        next: (response) =>{

         const ventas = response.numero_ventas;

         this.cantidad_ventas = ventas;

         console.log('Cantidad de ventas:',this.cantidad_ventas);

        },

        error: (error) =>{

          console.log(JSON.stringify(error,null,3));
        }
      })
    }
  }




  cerrarSesion():void{

    localStorage.removeItem('token_admin');
    localStorage.removeItem('data_admin');

    setTimeout(() =>{

      this.router.navigate(['/login/administrador']);
    })
  }

  rutaProductos():void{
    this.router.navigate(['/productos/admin'])
  }

  rutaPerfil():void{

    this.router.navigate(['/perfil/admin'])
  }

  rutaPasswordNuevo():void{

    this.router.navigate(['/editarpassword/admin'])
  }


















}
