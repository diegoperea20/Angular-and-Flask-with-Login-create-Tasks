import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importa RouterModule para usar rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasaComponent } from './casa/casa.component';
import { LoginComponent } from './login/login.component';
import { LoginupComponent } from './loginup/loginup.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SameComponent } from './same/same.component';

@NgModule({
  declarations: [
    AppComponent,
    CasaComponent,
    LoginComponent,
    LoginupComponent,
    HomeComponent,
    TaskComponent,
    ChangepasswordComponent,
    SameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
