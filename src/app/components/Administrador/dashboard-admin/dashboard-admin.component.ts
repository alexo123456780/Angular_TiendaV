import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
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
  imports: [AvatarModule,TabViewModule,ButtonModule,InputTextModule,FormsModule,MenuModule,SidebarModule,TagModule,TableModule,CommonModule,RouterModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})


export class DashboardAdminComponent implements OnInit {

  estaCargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  administrador : Administrador | null = null;
  id_admin: number | null = null;


  constructor(private adminService:AdminServiceService,private router:Router){}

  ngOnInit(): void {

    this.obtenerIdAdmin();
    
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

          console.log(this.administrador);

        },

        error: (error) =>{

          console.log('Error al obtener el info del admin',JSON.stringify(error,null,3));

        }

      })

    }

  }








}
