import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user.model';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  user: string = '';
  id: string = '';
  token: string = '';

  changepasswordForm: FormGroup;
  same_password: string = '';
  email: string = '';
  error: string = '';

  constructor(private _apiService: ApiService, private fb: FormBuilder,private router: Router, private route: ActivatedRoute) { 
    this.changepasswordForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      same_password: ['', Validators.required],
    });

    // Verificar si el control 'password' no es nulo antes de suscribirse
    const passwordControl = this.changepasswordForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(value => {
        this.validatePassword();
      });
    }
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userForChangePassword');
    const storedId = localStorage.getItem('idForChangePassword');
    const storedToken = localStorage.getItem('tokenForChangePassword');

    if (!storedUser || !storedId || !storedToken) {
      this.router.navigate(['/']); // Redirigir al inicio si falta alguno de los datos necesarios
    } else {
      this.user = storedUser;
      this.id = storedId;
      this.token = storedToken;
      this.getEmail(parseInt(storedId)); // Llamada para obtener el email
    }

    // Limpiar los datos del almacenamiento local después de obtenerlos (si es necesario)
    // localStorage.removeItem('userForChangePassword');
    // localStorage.removeItem('idForChangePassword');
  }

  validatePassword(): void {
    const value = this.changepasswordForm.value.password;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const requirements = [
      /\d/,
      /[a-z]/,
      /[A-Z]/,
      /[!@#$%^&*]/,
      /.{8,}/,
      /\S/,
    ];
    const errorMessages = [
      "Debe incluir al menos un número.",
      "Debe incluir al menos una letra minúscula.",
      "Debe incluir al menos una letra mayúscula.",
      "Debe incluir al menos un carácter especial.",
      "La longitud de la contraseña debe ser igual o mayor a 8 caracteres.",
      "No debe contener espacios en blanco.",
    ];

    const errors = [];
    for (let i = 0; i < requirements.length; i++) {
      if (!requirements[i].test(value)) {
        errors.push(errorMessages[i]);
      }
    }

    if (errors.length > 0) {
      this.error = errors.join(" ");
    } else {
      this.error = "";
    }
  }

  async getEmail(id: number): Promise<void> {
    try {
      const user = await this._apiService.getUser(id).toPromise();
      if (user) {
        this.email = user.email; // Establecer el email obtenido del usuario
        this.changepasswordForm.patchValue({
          email: this.email
        });
      } else {
        console.log('El usuario no fue encontrado');
      }
    } catch (error) {
      console.log('Error al obtener el email:', error);
    }
  }
  

  handleHome(): void {
    this.router.navigate(['/home']);
  }

  async handleSubmit(): Promise<void> {
    if (this.changepasswordForm.value.password !== this.changepasswordForm.value.same_password) {
      window.alert("Las contraseñas no coinciden");
      return;
    }

    try {
      this.validatePassword();
      await this._apiService.updateUser({ id: parseInt(this.id), password: this.changepasswordForm.value.password , email: this.email, user: this.user }).toPromise();
      window.alert('Contraseña modificada correctamente');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al modificar la contraseña', error);
      window.alert('Error al modificar la contraseña');
    }
  }
}
