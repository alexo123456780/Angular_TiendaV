import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { UsuarioServiceService } from '../../../services/usuario-service.service';
import { UsuarioCredenciales } from '../../../interfaces/Usuario';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-login-usuario',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,ButtonModule,InputTextModule,PasswordModule,FloatLabelModule,MessageModule,ProgressSpinnerModule],
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})


export class LoginUsuarioComponent {

  estaCargando:boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  formulario: FormGroup;


  constructor(private usuarioService:UsuarioServiceService, private fb:FormBuilder, private router:Router){

    this.formulario = this.fb.group({

      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]]
    })

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




  logearse():void{

    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('password')?.value;

    const datos : UsuarioCredenciales = {email:email,password:password};

    if(this.formulario.valid){

      this.estaCargando = true;

      this.usuarioService.loginUsuario(datos).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          this.mensajeExito = 'Login exitoso, redirigiendo al dashboard';

          setTimeout(() =>{

            this.router.navigate(['/dashboard/usuarios'])


          },1400)

          this.limpiarMensajes();
        },

        error: (error) =>{

          this.estaCargando = false;

          this.mensajeError = 'Credenciales Invalidas intentelo denuevo';

          console.log(error);

          this.limpiarMensajes();

        }
      })

    }else{

      this.mensajeError = 'Complete todos los campos del formulario requerido porfavor';

      this.limpiarMensajes();

    }


  }



}
