import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-loginup',
  templateUrl: './loginup.component.html',
  styleUrls: ['./loginup.component.css'],
})
export class LoginupComponent implements OnInit {

  usersList: IUser[] = [];
  registrationForm: FormGroup;
  error: string = '';

  constructor(private _apiService: ApiService, private fb: FormBuilder,private router: Router) { 
    this.registrationForm = this.fb.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      same_password: ['', Validators.required],
    });
    
    // Verificar si el control 'password' no es nulo antes de suscribirse
    const passwordControl = this.registrationForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(value => {
        this.validatePassword();
      });
    }

  }
  
  ngOnInit(): void {
    this._apiService.getUsers().subscribe(data => {
      this.usersList = data;
    });
  }

  validatePassword(): void {
    const value = this.registrationForm.value.password;
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

  handleSubmit(): void {
    if (this.registrationForm.value.password !== this.registrationForm.value.same_password) {
      window.alert("Las contraseñas no coinciden");
      return;
    }
    if (this.registrationForm.value.user == '' || this.registrationForm.value.email == '') {
      window.alert("Valores incompletos");
      return;
    }

    this.validatePassword(); // Llamar a la función de validación antes de enviar el formulario

    if (this.error.length > 0) {
      console.log("Errores de validación:", this.error);
      return;
    }

    this._apiService
    .addUser(this.registrationForm.value)
    .subscribe((data: IUser) => {
      this.usersList.push(data);
      this.registrationForm.reset();
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    }, error => {
      alert("Error al registrar usuario, user ya existe o email ya existe");
    });
  }

 
}
