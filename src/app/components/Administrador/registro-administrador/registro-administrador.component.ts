import { Component , type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AdminServiceService } from '../../../services/admin-service.service';
import { TiendaServiceService } from '../../../services/tienda-service.service';
import { Tienda } from '../../../interfaces/Tienda';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-registro-administrador',
  standalone:true,
imports: 
[
  ReactiveFormsModule,CommonModule,RouterModule,ButtonModule,PasswordModule,CheckboxModule,
  InputTextModule,CardModule,MessageModule,ProgressSpinnerModule,FloatLabelModule,SelectModule
],
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})


export class RegistroAdministradorComponent  implements OnInit {

  estaCargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  datos: FormData | null = null;
  imagen_preview : string | ArrayBuffer | null = null;
  perfil_imagen: File | null = null;
  formulario_registro: FormGroup;
  tiendas: Tienda[] = [];
  mostrarModal:boolean = false;


  constructor(private adminService:AdminServiceService,private fb:FormBuilder,private router:Router,private tiendaService:TiendaServiceService){

    this.formulario_registro = this.fb.group({

      nombre_administrador:['',[Validators.required,Validators.maxLength(255)]],
      apellido_paterno: ['',Validators.maxLength(255)],
      apellido_materno:['',Validators.maxLength(255)],
      numero_telefonico:['',[Validators.required,Validators.maxLength(10)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      tienda_id:['',Validators.required]

    })

  }

  ngOnInit(): void {
    this.obtenerTiendas();
    
  }


  limpiarMensajes():void{

    if(this.mensajeExito){

      setTimeout(() =>{

        this.mensajeExito = '';

      },1300)

    }

    if(this.mensajeError){

      setTimeout(() =>{

        this.mensajeError = '';

      },1400)
    }
  }


  obtenerTiendas():void{

    this.tiendaService.verTiendas().subscribe({

      next: (response) =>{

        if(response.data.length === 0){

          console.log('Aun no hay tiendas registradas');
        }

        console.log('Tiendas buscadas correctamente');

        this.tiendas = [...response.data];

        console.log(this.tiendas);

      },
      
      error: (error) =>{

        console.log('Error interno',JSON.stringify(error,null,2));

      }


    })

  }





  subirImagen(event:Event):void{

    const imagen = (event.target as HTMLInputElement).files?.[0];

    if(imagen){

      this.perfil_imagen = imagen;

      const reader = new FileReader();

      reader.onload = () =>{

        this.imagen_preview = reader.result;
      }

      reader.readAsDataURL(imagen);
    }

  }


  validarFormData():void{

    this.datos = new FormData();

    const nombre_administrador = this.formulario_registro.get('nombre_administrador')?.value;
    const apellido_paterno = this.formulario_registro.get('apellido_paterno')?.value;
    const apellido_materno = this.formulario_registro.get('apellido_materno')?.value;
    const numero_telefonico = this.formulario_registro.get('numero_telefonico')?.value;
    const email = this.formulario_registro.get('email')?.value;
    const password = this.formulario_registro.get('password')?.value;
    const tienda_id = this.formulario_registro.get('tienda_id')?.value;

    this.datos.append('nombre_administrador',nombre_administrador);

    if(apellido_paterno){
      this.datos.append('apellido_paterno',apellido_paterno);
    }

    if(apellido_materno){

      this.datos.append('apellido_materno',apellido_materno);
    }

    if(this.perfil_imagen){

      this.datos.append('perfil',this.perfil_imagen);

    }

    this.datos.append('numero_telefonico',numero_telefonico);
    this.datos.append('email',email);
    this.datos.append('password',password);
    this.datos.append('tienda_id',tienda_id);


  }


  registrarAdministrador():void{

    this.validarFormData();

    if(this.formulario_registro.valid && this.perfil_imagen && this.datos){

      this.estaCargando = true;

      this.adminService.registroAdministrador(this.datos).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Registro exitoso,redirigiendo al login';

          setTimeout(() =>{

            this.router.navigate(['/login/administrador'])
          },1300)

        },

        error: (error) => {

          this.estaCargando = false;
          this.mensajeError = 'Ocurrio un error intentelo mas tarde porfavor nos encargaremos de arreglar el problema';

          console.log('Error:',JSON.stringify(error,null,2));

          this.limpiarMensajes();


        }
      })
    }else{

      this.estaCargando= false;
      this.mensajeError = 'Complete todos los campos requeridos'

      this.limpiarMensajes();
    }

  }


























}
