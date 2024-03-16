import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasaComponent } from './casa/casa.component';
import { LoginComponent } from './login/login.component';
import { LoginupComponent } from './loginup/loginup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authguard/auth.guard'; // Importa el guardia de ruta
import { TaskComponent } from './task/task.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import { SameComponent } from './same/same.component';

const routes: Routes = [
  {path:'',component:CasaComponent},
  {path:'login',component: LoginComponent},
  {path:'loginup',component:LoginupComponent},
  {path:'home',component: HomeComponent, canActivate: [AuthGuard]},
  {path:'task',component: TaskComponent, canActivate: [AuthGuard]},
  {path:'changepassword',component:ChangepasswordComponent , canActivate: [AuthGuard]},
  {path:'same',component: SameComponent, canActivate: [AuthGuard]},
  {path:'**',redirectTo:'' , pathMatch:'full'}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
