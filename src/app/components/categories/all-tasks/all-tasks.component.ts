import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public isSidebarOpen: boolean = false;
  public selectedTaskIndex: number | null = null;
  public taskForm: FormGroup;
  public taskTitle: string = '';
  public TaskStatus = TaskStatus;
  public isEditingTask: boolean = false;
  public alertMessage: string = '';
  public showAlert: boolean = false;
  public alertType: 'create' | 'edit' | 'delete' = 'create';
  public originalTask: Task | null = null;
  public filterStatus: FormControl;
  public searchControl: FormControl;
  public showCloseButton: boolean = false; // Nueva propiedad

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.filterStatus = new FormControl('');
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.taskForm = this.initForm();
    this.getTasks();

    this.filterStatus.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    this.searchControl.valueChanges.subscribe((value) => {
      this.showCloseButton = !!value;
      this.applyFilter();
    });
  }

  openSidebar(): void {
    if (this.hasUnsavedChanges()) {
      if (!confirm('Tienes cambios sin guardar. ¿Estás seguro de que deseas continuar?')) {
        return;
      }
    }
    this.isEditingTask = false;
    this.isSidebarOpen = true;
    this.taskTitle = 'Nueva tarea';
    this.taskForm.reset();
    this.originalTask = null;
  }

  closeSidebar(): void {
    if (this.hasUnsavedChanges()) {
      if (!confirm('Tienes cambios sin guardar. ¿Estás seguro de que deseas cerrar el panel?')) {
        return;
      }
    }
    this.isSidebarOpen = false;
  }

  initForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', Validators.required],
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
        this.filteredTasks = tasks;
        this.sortTasks();
      },
      error: (error) => {
        console.error('Error al obtener las tareas->', error);
      }
    });
  }

  saveList(): void {
    if (this.taskForm.invalid) {
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
      task.createdAt = this.taskForm.controls['createdAt'].value ? this.taskForm.controls['createdAt'].value : new Date();
      this.tasks.unshift(task);
      this.alertType = 'create';
      this.showAlertMessage('Tarea creada con éxito.');
    }
   this.isSidebarOpen = false;
   this.taskForm.reset();
  }

  editTask(task: Task, index: number): void {
    this.taskTitle = 'Editar tarea';
    this.isEditingTask = true;
    this.isSidebarOpen = true;
    this.selectedTaskIndex = index;
    this.originalTask = { ...task };
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
    this.applyFilter();
  }

  cancelEdit(): void {
    if (this.selectedTaskIndex !== null) {
      const originalTask = this.tasks[this.selectedTaskIndex];
      this.taskForm.patchValue({
        ...originalTask,
        createdAt: originalTask.createdAt ? formatDate(new Date(originalTask.createdAt), 'yyyy-MM-dd', 'en') : null,
      });
    }
  }

  private showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  applyFilter(): void {
    const status = this.filterStatus.value;
    const searchTerm = this.searchControl.value ? this.searchControl.value.toLowerCase() : '';

    this.filteredTasks = this.tasks.filter(task => {
      const matchesStatus = status ? task.status === status : true;
      const matchesSearch = task.title.toLowerCase().includes(searchTerm);
      return matchesStatus && matchesSearch;
    });
  }

  clearInput(): void {
    this.searchControl.setValue('');
    this.applyFilter();
  }

  private hasUnsavedChanges(): boolean {
    if (!this.isEditingTask) {
      return !this.taskForm.pristine;
    }
    if (this.originalTask) {
      const currentValues = this.taskForm.value;
      return JSON.stringify(this.originalTask) !== JSON.stringify(currentValues);
    }
    return false;
  }

}
