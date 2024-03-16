import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  loginForm: FormGroup;
  incorrectLogin: boolean = false;

  constructor(private _apiService: ApiService, private fb: FormBuilder, private router: Router) { 
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async handleSubmit() {
    const username = this.loginForm.get('user')?.value;
    const password = this.loginForm.get('password')?.value;

    try {
      const response = await this._apiService.login(username, password).toPromise();
      const token = response.token;
      const user_id = response.user_id;

      // Guardar el token en el almacenamiento local (localStorage) para su uso posterior
      localStorage.setItem("token", token);
      localStorage.setItem('user', username);
      localStorage.setItem('id', user_id);

      // Redireccionar a la página de inicio después de un inicio de sesión exitoso
      this.router.navigate(['/home']); // Ajusta la ruta según tu configuración
    } catch (error) {
      this.incorrectLogin = true;
    }
  }  
  
  
}
