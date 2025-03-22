import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = 'assets/tasks.json';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl).pipe(
      map(tasks => tasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
    );
  }
}
