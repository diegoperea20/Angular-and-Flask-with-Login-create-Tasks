import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../models/task.model'; 
import { tap } from 'rxjs/operators'; // Importa el operador tap

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  user: string = '';
  id: string = '';
  token: string = '';

  title: string = '';
  description: string = '';
  editing: boolean = false;
  taskForm: FormGroup;
  id_task: string = '';
  tasks: ITask[] =[];

  constructor(private _apiService: ApiService, private fb: FormBuilder) { 
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const storedId = localStorage.getItem('id');
    const storedToken = localStorage.getItem('token');

    if (!storedUser || !storedId) {
      window.location.replace('/');
    } else {
      this.user = storedUser;
      this.id = storedId;
      this.token = storedToken ?? '';
    }

    this.getTasks();
  }

  async getTasks(): Promise<void> {
    try {
      if (this.user) {
        const fetchedTasks = await this._apiService.getUserTasks(this.user).toPromise();
        this.tasks = fetchedTasks ? fetchedTasks : [];
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
  

  async handleSubmit(): Promise<void> {
  try {
    if (!this.editing) {
      const task: ITask = { id: Number(this.id), user: this.user, title: this.taskForm.value.title, description: this.taskForm.value.description };
      await this._apiService.createTask(task).pipe(
        tap(newTask => {
          this.tasks.push(newTask); // Agrega la nueva tarea a la lista local de tareas
        })
      ).toPromise();
    } else {
      const task: ITask = { id: Number(this.id_task), user: this.user, title: this.taskForm.value.title, description: this.taskForm.value.description };
      
      if (this.id_task) {
        await this._apiService.updateTask(task).toPromise();
        this.editing = false;
        this.id_task = '';

        // Establecer los valores del formulario con los valores actuales
        this.taskForm.patchValue({
          title: '',
          description: ''
        });
      }
    }

    // Restablecer los valores del formulario después de enviar
    this.taskForm.reset();

    await this.getTasks();
  } catch (error) {
    console.error('Error submitting task:', error);
  }
}

  

  async deleteTask(id: string): Promise<void> {
    try {
      await this._apiService.deleteTask(Number(id)).toPromise();
      await this.getTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  async editTask(id: string): Promise<void> {
    try {
      if (this.user && id) {
        const task: ITask[] | undefined = await this._apiService.getTaskWithId(id, this.user).toPromise();
        if (task && task.length > 0) {
          this.editing = true;
          this.id_task = id;
          this.title = task[0].title;
          this.description = task[0].description;

           // Corregir la asignación de valores al formulario
        this.taskForm.patchValue({
          title: task[0].title,
          description: task[0].description
        });

        }
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  }
  
  

  cancelEdit(): void {
    this.editing = false;
    this.title = '';
    this.description = '';
    this.id_task = '';

    this.taskForm.patchValue({
      title: '',
      description: ''
    });
  }

  home():void{
    window.location.href = '/home';
  }

  same():void{
    window.location.href = '/same';
  }
}
