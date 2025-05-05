import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../../../services/usuario-service.service';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-registro-usuario',
  standalone:true,
  imports:
  [
    ReactiveFormsModule,CommonModule,RouterModule,ButtonModule,PasswordModule,CheckboxModule,
    InputTextModule,
    CardModule,
    MessageModule,
    ProgressSpinnerModule
  ],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})


export class RegistroUsuarioComponent {

  estaCargando:boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  mostrarPassword:boolean = false;
  mostrarModal:boolean = false;
  imagenPreview: string | ArrayBuffer | null = null;
  perfil: File | null = null;
  formularioRegistro:FormGroup;
  datos: FormData | null = null;

  constructor(private usuarioService:UsuarioServiceService, private fb:FormBuilder, private router:Router){

    this.formularioRegistro = this.fb.group({

      nombre_usuario:['',[Validators.required,Validators.maxLength(255)]],
      apellido_paterno:['',[Validators.maxLength(255)]],
      apellido_materno:['',[Validators.maxLength(255)]],
      numero_telefonico: ['',[Validators.required,Validators.maxLength(10)]],
      direccion:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]]
    })
  }


  limpiarFiltro():void{

    if(this.mensajeError){

      setTimeout(() =>{

        this.mensajeError = '';

      },1300)
    }

    if(this.mensajeExito){

      setTimeout(() =>{

        this.mensajeExito = '';

      },1300)
    }
  }


  seleccionarImagen(event:Event):void{

    const imagen = (event.target as HTMLInputElement).files?.[0];

    if(imagen){

      this.perfil = imagen;

      const reader = new FileReader();


      reader.onload = () =>{

        this.imagenPreview = reader.result;
      }

      reader.readAsDataURL(imagen);
    }

  }


  enviarFormData():void{

    this.datos = new FormData();

    const nombreUsuario = this.formularioRegistro.get('nombre_usuario')?.value;
    const apellidoMaterno = this.formularioRegistro.get('apellido_materno')?.value;
    const apellido_paterno = this.formularioRegistro.get('apellido_paterno')?.value;
    const numeroTelefono = this.formularioRegistro.get('numero_telefonico')?.value;
    const email = this.formularioRegistro.get('email')?.value;
    const password = this.formularioRegistro.get('password')?.value;
    const direccion = this.formularioRegistro.get('direccion')?.value;

    this.datos.append('nombre_usuario',nombreUsuario);

    if(apellido_paterno){
      this.datos.append('apellido_paterno',apellido_paterno);
    }

    if(apellidoMaterno){
      this.datos.append('apellido_materno',apellidoMaterno);
    }

    if(this.perfil){

      this.datos.append('perfil_usuario',this.perfil);
    }

    this.datos.append('numero_telefonico',numeroTelefono);
    this.datos.append('email',email);
    this.datos.append('password',password)
    this.datos.append('direccion',direccion);

  }

  enviarRegistro():void{

    this.enviarFormData();

    if(this.datos && this.formularioRegistro.valid){

      this.estaCargando = true;

      this.usuarioService.registrarUsuario(this.datos).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Registro exitoso, redirigiendo al login';

          console.log('Respuesta de la api:',JSON.stringify(response.message))

          setTimeout(() =>{

            this.router.navigate(['/login/usuario']);
          },1300)

        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Error de validacion en los campos';

          console.log('Error detallado',JSON.stringify(error,null,2));

          this.limpiarFiltro();


        }

      })


    }else{

      this.mensajeError = 'Complete los campos requeridos'

      this.limpiarFiltro();

    }

  }



  alertaModal():void{

    if(this.formularioRegistro.valid){

      this.mostrarModal = true;

    }else{

      this.mensajeError = 'Error en la carga de la imagen ingrese alguna foto de perfil obligatoria'
      this.mostrarModal= false;

      this.limpiarFiltro();


    }
  }


  confirmarModal():void{

    this.mostrarModal = false;
    this.enviarRegistro();

  }
}
