import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = 'https://todo-backend-net.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.taskUrl}/api/TaskApi`).pipe(
      map(tasks => tasks.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateA - dateB;
      }))
    );
  }

  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.taskUrl}/api/TaskApi`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.taskUrl}/api/TaskApi/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.taskUrl}/api/TaskApi/${id}`);
  }

}
