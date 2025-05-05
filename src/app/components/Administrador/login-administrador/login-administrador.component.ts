import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { AdministradorCredenciales } from '../../../interfaces/Administrador';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login-administrador',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,ButtonModule,InputTextModule,PasswordModule,ProgressSpinnerModule,MessageModule,FloatLabelModule],
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.css']
})


export class LoginAdministradorComponent {

  estaCargando:boolean = false;
  mensajeExito:string = '';
  mensajeError: string = '';
  formularioGeneral: FormGroup;


  constructor(private adminService:AdminServiceService, private fb:FormBuilder, private router:Router){

    this.formularioGeneral = this.fb.group({

      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]]
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

    const email = this.formularioGeneral.get('email')?.value;
    const password = this.formularioGeneral.get('password')?.value;

    const datos : AdministradorCredenciales = {email:email,password:password};


    if(this.formularioGeneral.valid){

      this.estaCargando = true;

      this.adminService.loginAdministrador(datos).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          this.mensajeExito = 'Login exitoso';

          console.log('Mensaje Api:',JSON.stringify(response,null,3));

          setTimeout(() =>{

            this.router.navigate(['/dashboard/admin'])

          },1400)

        },

        error: (error) =>{
          this.estaCargando = false;
          this.mensajeError = 'Credenciales invalidas intentelo de nuevo';

          console.log(error);

          this.limpiarMensajes();

        }

      })
    }else{

      this.mensajeError = 'Complete todo los campos requeridos';

      this.limpiarMensajes();

    }



  }









  



  



}
