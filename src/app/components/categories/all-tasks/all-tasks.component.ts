import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  public tasks: Task[] = [];
  public p: number = 1;
  public isSidebarOpen: boolean = false;
  public selectedTaskIndex: number | null = null;
  public taskForm: FormGroup;
  public taskTitle: string = '';
  public TaskStatus = TaskStatus;
  public isEditingTask: boolean = false;

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
      title: [''],
      description: [''],
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
    const task: Task = this.taskForm.value;

    if (this.isEditingTask && this.selectedTaskIndex !== null) {
      this.tasks[this.selectedTaskIndex] = { ...this.tasks[this.selectedTaskIndex], ...task };
      this.isEditingTask = false;
    } else {
      this.tasks.unshift(task);
    }
    this.sortTasks();
    this.closeSidebar();
  }

  editTask(task: Task): void {
    this.taskTitle = 'Editar tarea';
    this.isEditingTask = true;
    this.isSidebarOpen = true;
    this.taskForm.patchValue({
      ...task,
      createdAt: task.createdAt || new Date()
    });
    this.tasks[this.selectedTaskIndex as number] = task;
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  toggleTaskDetails(index: number): void {
    this.selectedTaskIndex = this.selectedTaskIndex === index ? null : index;
    this.editTask(this.tasks[index]);
  }

  toggleTaskStatus(index: number): void {
    this.tasks[index].status = this.tasks[index].status === TaskStatus.Pending ? TaskStatus.Completed : TaskStatus.Pending;
    this.sortTasks();
  }

}
