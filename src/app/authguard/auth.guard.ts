import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true; // Si hay un token en el almacenamiento local, permitir acceso
    } else {
      this.router.navigate(['/login']); // Si no hay un token, redirigir al componente de inicio de sesión
      return false;
    }
  }
}
