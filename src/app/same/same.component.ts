import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ITask } from '../models/task.model';

@Component({
  selector: 'app-same',
  templateUrl: './same.component.html',
  styleUrls: ['./same.component.css']
})
export class SameComponent implements OnInit {
  user: string = '';
  sameCount: any[] = [];
  emailsc: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    // Si no se encuentra el nombre de usuario en el almacenamiento local, redirigir al inicio de sesión
    window.location.replace('/');
  } else {
    this.user = storedUser;
  }
}


  getSameCount(): void {
    this.apiService.getTasksWithSameTitle(this.user).subscribe(
      data => {
        this.sameCount = data;
        if (data && data.message === "Ningún título coincide con otros usuarios.") {
          window.alert("Ningún título coincide con otros usuarios.");
        }
      },
      error => {
        console.error('Error fetching same count:', error);
      }
    );
  }

  getEmails(): void {
    this.apiService.getTasksWithSameTitleAndEmail(this.user).subscribe(
      data => {
        this.emailsc = data;
        if (data && data.message === "Ningún título coincide con otros usuarios.") {
          window.alert("Ningún título coincide con otros usuarios.");
        }
      },
      error => {
        console.error('Error fetching emails:', error);
      }
    );
  }


  task(): void {
    window.location.href = '/task';
  }
}
