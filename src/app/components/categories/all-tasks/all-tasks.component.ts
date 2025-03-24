import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  public tasks: Task[] = [];
  public isSidebarOpen: boolean = false;
  public selectedTaskIndex: number | null = null;
  public taskForm: FormGroup;
  public taskTitle: string = '';
  public TaskStatus = TaskStatus;
  public isEditingTask: boolean = false;
  public alertMessage: string = '';
  public showAlert: boolean = false;
  public alertType: 'create' | 'edit' | 'delete' = 'create';

  constructor(private taskService: TaskService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.initForm();
    this.getTasks();
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
    this.taskTitle = 'Nueva tarea';
    this.taskForm.reset();
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  initForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: [''],
      createdAt: ['']
    });
  }

  sortTasks(): void {
    this.tasks.sort((a, b) => a.status === TaskStatus.Completed ? 1 : -1);
  }

  getTasks(): void{
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.sortTasks();
      },
      error: (error) => {
        console.error('Error al obtener las tareas->', error);
      }
    });
  }

  saveList(): void {
    if(this.taskForm.invalid){
      this.showAlertMessage('Por favor, completa el formulario.');
      return;
    }
    const task: Task = this.taskForm.value;

    if (this.isEditingTask && this.selectedTaskIndex !== null) {
      this.tasks[this.selectedTaskIndex] = { ...this.tasks[this.selectedTaskIndex], ...task };
      this.isEditingTask = false;
      this.selectedTaskIndex = null;
      this.alertType = 'edit';
      this.showAlertMessage('Tarea editada con éxito.');
    } else {
      this.tasks.unshift(task);
      this.alertType = 'create';
      this.showAlertMessage('Tarea creada con éxito.');
    }
    this.closeSidebar();
  }

  editTask(task: Task, index: number): void {
    this.taskTitle = 'Editar tarea';
    this.isEditingTask = true;
    this.isSidebarOpen = true;
    this.selectedTaskIndex = index;
    this.taskForm.patchValue({
      ...task,
      createdAt: task.createdAt ? formatDate(new Date(task.createdAt), 'yyyy-MM-dd', 'en') : null,
    });
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.alertType = 'delete';
    this.sortTasks();
    this.showAlertMessage('Tarea eliminada con éxito.');
  }

  toggleTaskDetails(index: number): void {
    this.selectedTaskIndex = this.selectedTaskIndex === index ? null : index;
  }

  toggleTaskStatus(index: number): void {
    this.tasks[index].status = this.tasks[index].status === TaskStatus.Pending ? TaskStatus.Completed : TaskStatus.Pending;
    this.sortTasks();
  }

  private showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

}
