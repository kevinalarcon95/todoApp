import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { distinct, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;
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
  public showCloseButton: boolean = false;
  private originalFormValue: Task | null = null;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.filterStatus = new FormControl('');
    this.searchControl = new FormControl('');
  }

  /**
   * Lifecycle hook: Initializes the component, sets up the form, and fetches tasks.
   */
  ngOnInit(): void {
    this.taskForm = this.initForm();
    this.getTasks();

    this.taskForm.valueChanges.subscribe(() => {
      if (!this.originalFormValue) {
        this.originalFormValue = this.taskForm.getRawValue(); // Captura el estado inicial
      }
    });

    // Apply filters when the filter status changes
    this.filterStatus.valueChanges.subscribe(() => {
      this.applyFilter();
    });

    // Apply filters and toggle the "clear search" button when the search term changes
    this.searchControl.valueChanges.subscribe((value) => {
      this.showCloseButton = !!value;
      this.applyFilter();
    });
  }

  /**
   * Fetches tasks from the backend and initializes the task list.
   */
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
        this.sortTasks();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  /**
   * Saves a task (either creates a new task or updates an existing one).
   */
  saveTask(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = this.taskForm.value;

    if (this.isEditingTask && this.selectedTaskIndex !== null) {
      this.updateTask(task);
    } else {
      this.createTask(task);
    }

    this.isSidebarOpen = false;
    this.taskForm.reset();
    this.resetOriginalFormValue();
  }

  /**
   * Updates an existing task in the backend.
   * @param task The updated task data.
   */
  private updateTask(task: Task): void {
    const updatedTask = { ...this.tasks[this.selectedTaskIndex!], ...task };
    this.taskService.updateTask(updatedTask).subscribe({
      next: (updated) => {
        this.tasks[this.selectedTaskIndex!] = updated;
        this.alertType = 'edit';
        this.showAlertMessage('Tarea actualizada correctamente.');
        this.getTasks();
        this.applyFilter();
      },
      error: (error) => console.error('Error updating task:', error)
    });
    this.isEditingTask = false;
    this.selectedTaskIndex = null;
  }

  /**
   * Creates a new task in the backend.
   * @param task The new task data.
   */
  private createTask(task: Task): void {
    task.createdAt = new Date();
    this.taskService.saveTask(task).subscribe({
      next: (newTask) => {
        this.tasks.unshift(newTask);
        this.alertType = 'create';
        this.showAlertMessage('Tarea creada correctamente.');
      },
      error: (error) => console.error('Error saving task:', error)
    });
  }

  /**
   * Deletes a task from the backend and updates the local list.
   * @param index The index of the task to delete.
   */
  deleteTask(index: number): void {
    const taskId = this.tasks[index].id;
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.splice(index, 1);
        this.alertType = 'delete';
        this.sortTasks();
        this.showAlertMessage('Tarea eliminada correctamente.');
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.showAlertMessage('Error deleting task. Please try again.');
      }
    });
  }

  /**
   * Toggles the status of a task (completed/pending) and updates it in the backend.
   * @param index The index of the task to toggle.
   */
  toggleTaskStatus(index: number): void {
    const task = this.tasks[index];
    const updatedStatus: TaskStatus = task.status === TaskStatus.Completed ? TaskStatus.Pending : TaskStatus.Completed;
    const updatedTask = { ...task, status: updatedStatus };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (updated) => {
        this.tasks[index] = updated;
        this.showAlertMessage('Tarea actualizada.');
        this.getTasks();
      },
      error: (error) => {
        console.error('Error updating task status:', error);
        this.showAlertMessage('Error updating task status. Please try again.');
      }
    });
  }

  /**
   * Prepares the form for editing a task.
   * @param task The task to edit.
   * @param index The index of the task to edit.
   */
  editTask(task: Task, index: number): void {
    this.taskTitle = 'Editar tarea';
    this.isEditingTask = true;
    this.isSidebarOpen = true;
    this.selectedTaskIndex = index;
    this.originalTask = { ...task };
    this.taskForm.patchValue({
      ...task,
      completedAt: task.createdAt ? formatDate(new Date(task.completedAt), 'yyyy-MM-dd', 'en') : null,
    });
  }

  /**
   * Opens the sidebar for creating a new task.
   */
  openSidebar(): void {
    if (this.hasUnsavedChanges()) {
      this.confirmModal.open();
      return;
    }
    this.isEditingTask = false;
    this.isSidebarOpen = true;
    this.taskTitle = 'Nueva tarea';
    this.taskForm.reset();
    this.originalTask = null;
  }

  /**
   * Closes the sidebar and checks for unsaved changes.
   */
  closeSidebar(): void {
    if (this.hasUnsavedChanges()) {
      this.confirmModal.open();
      return;
    }
    this.isSidebarOpen = false;
  }


  /**
   * Handles the confirmation action for the task editing process.
   *
   * This method performs the following actions:
   * - Disables the task editing mode.
   * - Closes the sidebar.
   * - Resets the task title to its default value ("New Task").
   * - Resets the task form to its initial state.
   * - Clears the reference to the original task.
   * - Closes the confirmation modal dialog.
   *
   * @returns {void}
   */
  onConfirm(): void {
    this.isEditingTask = false;
    this.isSidebarOpen = false;
    this.taskTitle = 'Nueva tarea';
    this.taskForm.reset();
    this.originalTask = null;
    this.confirmModal.close();
  }

  /**
   * Applies filters to the task list based on status and search term.
   */
  applyFilter(): void {
    const status = this.filterStatus.value;
    const searchTerm = this.searchControl.value ? this.searchControl.value.toLowerCase() : '';

    this.filteredTasks = this.tasks.filter(task => {
      const matchesStatus = status ? task.status === status : true;
      const matchesSearch = task.title.toLowerCase().includes(searchTerm);
      return matchesStatus && matchesSearch;
    });
  }

  /**
   * Clears the search input and reapplies filters.
   */
  clearInput(): void {
    this.searchControl.setValue('');
    this.applyFilter();
  }

  /**
   * Toggles the visibility of task details.
   * @param index The index of the task to toggle details for.
   */
  toggleTaskDetails(index: number): void {
    this.selectedTaskIndex = this.selectedTaskIndex === index ? null : index;
  }

  /**
   * Cancels the editing process and restores the original task values.
   */
  cancelEdit(): void {
    if (this.selectedTaskIndex !== null) {
      const originalTask = this.tasks[this.selectedTaskIndex];
      this.taskForm.patchValue({
        ...originalTask,
        completedAt: originalTask.createdAt ? formatDate(new Date(originalTask.createdAt), 'yyyy-MM-dd', 'en') : null,
      });
    }
    this.resetOriginalFormValue();
  }

  /**
   * Sorts tasks by their status (pending tasks first).
   */
  sortTasks(): void {
    this.tasks.sort((a, b) => a.status === TaskStatus.Completed ? 1 : -1);
  }

  /**
   * Counts the number of tasks with a specific status.
   * @param status The status to count tasks for.
   * @returns The number of tasks with the specified status.
   */
  countTasksByStatus(status: TaskStatus): number {
    return this.tasks.filter(task => task.status === status).length;
  }

  /**
   * Initializes the task form with validation rules.
   * @returns A FormGroup instance for the task form.
   */
  initForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', Validators.required],
      completedAt: [null, Validators.required],
    });
  }

  /**
   * Displays an alert message for a short duration.
   * @param message The message to display in the alert.
   */
  private showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  /**
   * Resets the original state of the form when saving or canceling.
   */
  private resetOriginalFormValue(): void {
    this.originalFormValue = this.taskForm.getRawValue() as Task;
  }

  /**
   * Checks if there are unsaved changes in the form.
   * @returns True if there are unsaved changes, false otherwise.
   */
   hasUnsavedChanges(): boolean {
    if (!this.isEditingTask) {
      return !this.taskForm.pristine;
    }

    const currentFormValue = this.taskForm.getRawValue() as Task;
    return JSON.stringify(currentFormValue) !== JSON.stringify(this.originalFormValue);
  }
}
