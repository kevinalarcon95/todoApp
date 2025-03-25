import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskService } from './task.service';
import { Task, TaskStatus } from '../models/task.model';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AllTasksComponent } from '../components/categories/all-tasks/all-tasks.component';
import { ChartTaskComponent } from '../components/chart-task/chart-task.component';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DashboardComponent, AllTasksComponent, ChartTaskComponent],
      providers: [TaskService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks from the API', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', status: TaskStatus.Pending, createdAt: new Date() },
      { id: 2, title: 'Task 2', status: TaskStatus.Completed, createdAt: new Date(), completedAt: new Date() }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a new task', () => {
    const newTask: Task = { id: 3, title: 'New Task', status: TaskStatus.Pending, createdAt: new Date() };

    service.saveTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(newTask);
  });

  it('should delete a task', () => {
    const taskId = 1;

    service.deleteTask(taskId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle HTTP errors', () => {
    service.getTasks().subscribe(
      () => fail('Expected an error, not tasks'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    req.flush('Error del servidor', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should update an existing task', () => {
    const updatedTask: Task = { id: 1, title: 'Updated Task', status: TaskStatus.Completed, createdAt: new Date(), completedAt: new Date() };

    service.updateTask(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`http://localhost:3000/tasks/${updatedTask.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });
});
