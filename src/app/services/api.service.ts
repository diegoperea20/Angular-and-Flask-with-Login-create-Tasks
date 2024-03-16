import { HttpClient, HttpErrorResponse ,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { IUser } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseurl = 'http://127.0.0.1:5000';
  
  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(`${this.baseurl}/loginup`);
  }

  addUser(user: IUser): Observable<IUser> {
    return this._httpClient.post<IUser>(`${this.baseurl}/loginup`, user);
  }

  getUser(id: number): Observable<IUser> {
    return this._httpClient.get<IUser>(`${this.baseurl}/loginup/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this._httpClient.put<IUser>(`${this.baseurl}/loginup/${user.id}`, user);
  }

  deleteUser(id: number): Observable<IUser> {
    return this._httpClient.delete<IUser>(`${this.baseurl}/loginup/${id}`);
  }


  // login code here
  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.baseurl}/`;
    const body = { user: username, password };

    return this._httpClient.post<any>(loginUrl, body, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private getHeaders(): HttpHeaders {
    // Aquí puedes agregar cualquier header que necesites, como Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }


  //Tasks code here
   // Métodos para las tareas (tasks)
   createTask(task: ITask): Observable<ITask> {
    return this._httpClient.post<ITask>(`${this.baseurl}/tasks`, task, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getTasks(): Observable<ITask[]> {
    return this._httpClient.get<ITask[]>(`${this.baseurl}/tasks`)
      .pipe(catchError(this.handleError));
  }

  getUserTasks(user: string): Observable<ITask[]> {
    return this._httpClient.get<ITask[]>(`${this.baseurl}/tasks/${user}`)
      .pipe(catchError(this.handleError));
  }

  updateTask(task: ITask): Observable<ITask> {
    return this._httpClient.put<ITask>(`${this.baseurl}/tasks/${task.id}`, task, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<ITask> {
    return this._httpClient.delete<ITask>(`${this.baseurl}/tasks/${id}`)
      .pipe(catchError(this.handleError));
  }

  deleteAllUserTasks(user: string): Observable<ITask[]> {
    return this._httpClient.delete<ITask[]>(`${this.baseurl}/tasks/deleteall/${user}`)
      .pipe(catchError(this.handleError));
  }

  getTaskWithId(id: string, user: string): Observable<ITask[]> {
    return this._httpClient.get<ITask[]>(`${this.baseurl}/tasks/${id}/${user}`)
      .pipe(catchError(this.handleError));
  }

  //Filters 
  // Métodos para las tareas (tasks)

  getTasksWithSameTitle(user: string): Observable<any> {
    return this._httpClient.get<any>(`${this.baseurl}/tasks/countsames/${user}`)
      .pipe(catchError(this.handleError));
  }

  getTasksWithSameTitleAndEmail(user: string): Observable<any> {
    return this._httpClient.get<any>(`${this.baseurl}/tasks/countsame/${user}`)
      .pipe(catchError(this.handleError));
  }
}