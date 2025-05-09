import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { PasswordNuevo } from '../../../interfaces/Administrador';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-editar-password-a',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,PasswordModule,FloatLabelModule,ButtonModule],
  templateUrl: './editar-password-a.component.html',
  styleUrls: ['./editar-password-a.component.css']
})

export class EditarPasswordAComponent implements OnInit{

  estaCargando : boolean = false;
  mensajeExito : string = '';
  mensajeError : string = '';
  id_admin : number | null = null;
  datosPassword : PasswordNuevo = {password: ''};
  formularioPassword: FormGroup;


  constructor(private adminService: AdminServiceService, private fb:FormBuilder, private router: Router){

    this.formularioPassword = this.fb.group({

      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      password2: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]]
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

    if(this.mensajeError) setTimeout(() => {this.mensajeError = ''},1400);

  }

  validarPassword():boolean{

    const password1 = this.formularioPassword.get('password')?.value;
    const confirmarPassword = this.formularioPassword.get('password2')?.value;

    if(password1 !== confirmarPassword){

      this.mensajeError = 'El password no coincide intentelo de neuvo porfavor';

      this.limpiarMensajes();

      return false;

    }

    return true;

  }


  subirPassword():void{

    if(!this.validarPassword()){

      return;
    }

    if(this.formularioPassword.valid && this.id_admin){

    this.estaCargando = true;

    const password = this.formularioPassword.get('password')?.value;

    this.datosPassword = {password: password};

  
    this.adminService.cambiarPasswordAdmin(this.datosPassword,this.id_admin).subscribe({

      next: (response) =>{

        this.estaCargando = false;
        this.mensajeExito = 'Password actualizado correctamente';
        this.limpiarMensajes();
        this.formularioPassword.reset();

        console.log(response.message);

      },

      error : (error) =>{

        this.estaCargando = false;

        if(error.error && error.error.message){

          this.mensajeError = error.error.message;

          this.limpiarMensajes();

        }else{

          this.mensajeError = 'Error al actualizar el password';
          this.limpiarMensajes();
        }

        console.log(JSON.stringify(error,null,3));
      }
    })
    }else{

      this.mensajeError = 'No dejes campos vacios';
      this.limpiarMensajes();

    }

  }

  rutaDashboard():void{

    this.router.navigate(['/dashboard/admin'])
  }


  






















}
