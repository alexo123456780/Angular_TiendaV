import { Component,type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { Administrador } from '../../../interfaces/Administrador';

@Component({
  selector: 'app-perfil-a',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './perfil-a.component.html',
  styleUrls: ['./perfil-a.component.css']
})
export class PerfilAComponent implements OnInit {


  estaCargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  administrador: Administrador | null = null;
  id_admin: number | null = null;

  constructor(private adminService:AdminServiceService,private router:Router){}

  ngOnInit(): void {

    this.obtenerIdAdmin();
    
  }

  obtenerIdAdmin():void{
    this.id_admin = this.adminService.obtenerIdAdmin();
    this.obtenerInfoAdmin();

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




  obtenerInfoAdmin():void{

    if(this.id_admin){

      this.estaCargando = true;

      this.adminService.infoAdmin(this.id_admin).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          if(response.data && response.data !== undefined){

            this.mensajeExito = 'Informacion obtenida correctamente';

            this.administrador = response.data;

            console.log(this.administrador);

            this.limpiarMensajes();
          }
        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Error al obtener el info intentenlo mas tarde'

          console.log(JSON.stringify(error,null,3));

          this.limpiarMensajes();
        }
      })
    }
  }

  rutaActualizarPerfil():void{

    this.router.navigate(['/editar/perfil'])


  }

















}
