import { Routes } from '@angular/router';
import { LoginAdministradorComponent } from './components/Administrador/login-administrador/login-administrador.component';
import { RegistroAdministradorComponent } from './components/Administrador/registro-administrador/registro-administrador.component';
import { LoginUsuarioComponent } from './components/Usuario/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './components/Usuario/registro-usuario/registro-usuario.component';
import { DashboardAdminComponent } from './components/Administrador/dashboard-admin/dashboard-admin.component';
import { AdminGuard } from './guards/AdminGuard';


export const routes: Routes = 
[
    {path:'', redirectTo:'/login/usuario',pathMatch:'full'},
    {path:'login/administrador',component:LoginAdministradorComponent},
    {path:'registro/administrador',component:RegistroAdministradorComponent},
    {path:'dashboard/admin',component:DashboardAdminComponent,canActivate:[AdminGuard]},





    {path:'login/usuario',component:LoginUsuarioComponent},
    {path:'registro/usuario',component:RegistroUsuarioComponent},

    



];
