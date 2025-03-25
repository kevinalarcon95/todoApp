import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listTask: Task[] = [];
  completedTasksCount: number = 0;
  updatedTasksCount: number = 0;
  createdTasksCount: number = 0;
  tasksDueSoonCount: number = 0;
  recentActivities: { taskTitle: string; status: string; date: string }[] = [];
  taskStats: { pending: number; completed: number; overdue: number } = {
    pending: 0,
    completed: 0,
    overdue: 0
  };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  /**
   * Fetches tasks from the backend and calculates summary data.
   */
  getTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.listTask = data;
      this.calculateSummary();
    });
  }

  /**
   * Calculates summary data based on the task list.
   */
  calculateSummary() {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    const formatDate = (date: Date) => {
      return new Date(date.toLocaleDateString('en-US'));
    };

    const formattedSevenDaysAgo = formatDate(sevenDaysAgo);
    const formattedSevenDaysFromNow = formatDate(sevenDaysFromNow);

    this.completedTasksCount = this.listTask.filter(task =>
      task.status === TaskStatus.Completed &&
      task.completedAt && formatDate(new Date(task.completedAt)) >= formattedSevenDaysAgo
    ).length;

    this.updatedTasksCount = this.listTask.filter(task =>
      task.completedAt && formatDate(new Date(task.completedAt)) >= formattedSevenDaysAgo
    ).length;

    this.createdTasksCount = this.listTask.filter(task =>
      task.createdAt && formatDate(new Date(task.createdAt)) >= formattedSevenDaysAgo
    ).length;

    this.tasksDueSoonCount = this.listTask.filter(task =>
      task.completedAt && formatDate(new Date(task.completedAt)) <= formattedSevenDaysFromNow
    ).length;

    this.recentActivities = this.listTask.map(task => {
      if (task.completedAt) {
        return {
          taskTitle: task.title,
          status: task.status === TaskStatus.Completed ? 'Completada' : 'Pendiente',
          date: new Date(task.completedAt).toLocaleDateString('es-ES')
        };
      }
      return null;
    }).filter(activity => activity !== null) as { taskTitle: string; status: string; date: string }[];
  }

}
