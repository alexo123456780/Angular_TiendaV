import { Routes } from '@angular/router';
import { LoginAdministradorComponent } from './components/Administrador/login-administrador/login-administrador.component';
import { RegistroAdministradorComponent } from './components/Administrador/registro-administrador/registro-administrador.component';
import { LoginUsuarioComponent } from './components/Usuario/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './components/Usuario/registro-usuario/registro-usuario.component';
import { DashboardAdminComponent } from './components/Administrador/dashboard-admin/dashboard-admin.component';
import { ProductosAComponent } from './components/Administrador/productos-a/productos-a.component';
import { PerfilAComponent } from './components/Administrador/perfil-a/perfil-a.component';
import { EditarPerfilComponent } from './components/Administrador/editar-perfil/editar-perfil.component';
import { DashboardUsuarioComponent } from './components/Usuario/dashboard-usuario/dashboard-usuario.component';
import { EditarPasswordAComponent } from './components/Administrador/editar-password-a/editar-password-a.component';
import { AdminGuard } from './guards/AdminGuard';
import { userGuard } from './guards/UserGuard';


export const routes: Routes = 
[
    {path:'', redirectTo:'/login/administrador',pathMatch:'full'},
    {path:'login/administrador',component:LoginAdministradorComponent},
    {path:'registro/administrador',component:RegistroAdministradorComponent},
    {path:'dashboard/admin',component:DashboardAdminComponent,canActivate:[AdminGuard]},
    {path:'productos/admin',component:ProductosAComponent,canActivate:[AdminGuard]},
    {path:'perfil/admin',component:PerfilAComponent,canActivate:[AdminGuard]},
    {path:'editar/perfil',component:EditarPerfilComponent,canActivate:[AdminGuard]},
    {path:'editarpassword/admin',component:EditarPasswordAComponent,canActivate:[AdminGuard]},


    {path:'login/usuario',component:LoginUsuarioComponent},
    {path:'registro/usuario',component:RegistroUsuarioComponent},
    {path:'dashboard/usuarios',component:DashboardUsuarioComponent,canActivate:[userGuard]}
    

];
