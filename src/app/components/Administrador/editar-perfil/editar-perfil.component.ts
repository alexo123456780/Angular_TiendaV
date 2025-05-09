import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-editar-perfil',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,ProgressSpinnerModule,MessageModule,FloatLabelModule,InputTextModule,ButtonModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})


export class EditarPerfilComponent implements OnInit{

  estaCargando: boolean = false;
  mensajeError : string = '';
  mensajeExito : string = '';
  imagen_preview : string | ArrayBuffer | null = null;
  imagenNueva: File | null = null;
  id_admin : number | null = null;
  formularioGeneral : FormGroup;
  datos : FormData | null = null;


  constructor(private adminService:AdminServiceService, private fb:FormBuilder, private router: Router){

    this.formularioGeneral = this.fb.group({

      nombre_administrador : ['',Validators.maxLength(255)],
      apellido_paterno : ['',Validators.maxLength(255)],
      apellido_materno : ['',Validators.maxLength(255)],
      numero_telefonico : ['',Validators.maxLength(10)],
      email : ['',Validators.email]

    })
  }

  ngOnInit(): void {
    this.obtenerIdAdmin();
    
  }

  obtenerIdAdmin():void{

    this.id_admin = this.adminService.obtenerIdAdmin();

  }

  limpiarMensajes():void{

    if(this.mensajeExito) setTimeout(() => {this.mensajeExito = ''},1400);

    if(this.mensajeError) setTimeout(() => {this.mensajeError = ''},1400)
  }

  rutaDashboard():void{

    this.router.navigate(['/dashboard/admin'])

  }


  obtenerImagen(event:Event):void{

    const imagen = (event.target as HTMLInputElement).files?.[0];

    if(imagen){

      this.imagenNueva = imagen;

      const reader = new FileReader();

      reader.onload = () =>{

        this.imagen_preview = reader.result;
      }

      reader.readAsDataURL(imagen);
    }

  }

  validarFormData():void{

    this.datos = new FormData();

    this.datos.append('_method','PUT');

    const nombreAdministrador = this.formularioGeneral.get('nombre_administrador')?.value;
    const apellidoPaterno = this.formularioGeneral.get('apellido_paterno')?.value;
    const apellidoMaterno = this.formularioGeneral.get('apellido_materno')?.value;
    const numeroTelefono = this.formularioGeneral.get('numero_telefonico')?.value;
    const correo = this.formularioGeneral.get('email')?.value;

    if(this.imagenNueva) this.datos.append('perfil',this.imagenNueva);
    if(nombreAdministrador) this.datos.append('nombre_administrador',nombreAdministrador);
    if(apellidoPaterno) this.datos.append('apellido_paterno',apellidoPaterno);
    if(apellidoMaterno) this.datos.append('apellido_materno',apellidoMaterno);
    if(numeroTelefono) this.datos.append('numero_telefonico',numeroTelefono);
    if(correo) this.datos.append('email',correo);

  }

  enviarFormulario():void{

    this.validarFormData();

    if(this.formularioGeneral.valid && this.id_admin && this.datos){

      this.estaCargando = true;

      this.adminService.editarPerfilAdmin(this.datos,this.id_admin).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Perfil actualizado correctamente';

          console.log(response.message);

          this.limpiarMensajes();
          this.formularioGeneral.reset();

        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Error al actualizar el perfil intentelo mas tarde porfavor';

          console.log(JSON.stringify(error,null,3));

          this.limpiarMensajes();
        }
      })

    }
  }








}
