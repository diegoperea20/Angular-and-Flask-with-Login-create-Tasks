import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string = '';
  id: string = '';
  token: string = '';

  constructor(private _apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const storedId = localStorage.getItem('id');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedId && storedToken) {
      this.user = storedUser;
      this.id = storedId;
      this.token = storedToken;
    } else {
      this.router.navigate(['/login']); // Redirigir al inicio de sesión si no hay usuario, ID o token almacenados
    }
  }

  handleLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  changePassword(): void {
    localStorage.setItem('userForChangePassword', this.user);
    localStorage.setItem('idForChangePassword', this.id);
    localStorage.setItem('tokenForChangePassword', this.token);
    this.router.navigate(['/changepassword']);
  }

  async deleteAccount(): Promise<void> {
    if (window.confirm('¿Desea eliminar la cuenta?')) {
      try {
        await this._apiService.deleteUser(Number(this.id)).toPromise();
        // Eliminar todas las tareas asociadas con el usuario (si es necesario)
        await this._apiService.deleteAllUserTasks(this.user).toPromise();
        window.alert('Cuenta eliminada correctamente'); 
        this.handleLogout(); // Redirigir al inicio de sesión después de eliminar la cuenta
      } catch (error) {
        console.error('Error al eliminar la cuenta', error);
        window.alert('Error al eliminar la cuenta');
      }
    }
  }

  goToTask(): void {
    this.router.navigate(['/task']);
  }
}
