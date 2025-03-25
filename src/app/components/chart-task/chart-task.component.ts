import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-chart-task',
  templateUrl: './chart-task.component.html',
  styleUrls: ['./chart-task.component.css']
})
export class ChartTaskComponent implements OnInit {
  /**
   * Input property to receive task statistics from the parent component.
   */
  @Input() taskStats: { pending: number; completed: number; overdue: number } = {
    pending: 0,
    completed: 0,
    overdue: 0
  };

  /**
   * List of tasks fetched from the backend.
   */
  listTask: Task[] = [];

  /**
   * Chart.js instance for the doughnut chart.
   */
  private chartDoughnut!: Chart;

  /**
   * Labels for the doughnut chart.
   */
  private chartLabels: string[] = [
    'Tareas pendientes',
    'Tareas completadas',
    'Tareas vencidas',
  ];

  /**
   * Options for the doughnut chart.
   */
  private chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        labels: {
          boxWidth: 12,
          font: {
            size: 12
          }
        },
        display: true,
        position: 'top'
      }
    }
  };

  constructor(private taskService: TaskService) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Fetches tasks and initializes the chart.
   */
  ngOnInit(): void {
    this.getTasks();
  }

  /**
   * Initializes the doughnut chart with the current task statistics.
   */
  initCanvas() {
    console.log('Task stats for chart:', this.taskStats);
    const canvas = document.getElementById('chartDoughnut') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chartDoughnut = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.chartLabels,
            datasets: [
              {
          data: [this.taskStats.pending, this.taskStats.completed, this.taskStats.overdue],
          backgroundColor: ['#FF9800', '#4CAF50', '#FF6767']
              }
            ]
          },
          options: this.chartOptions
        });
      }
    }
  }

  /**
   * Fetches tasks from the backend and calculates task statistics.
   */
  getTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      console.log('Tasks received from backend:', data);
      this.listTask = data;
      this.calculateTaskStats();
      this.initCanvas();
    });
  }

  /**
   * Calculates the number of pending, completed, and overdue tasks.
   */
  calculateTaskStats() {
    const now = new Date();
    const formatDate = (date: Date) => new Date(date.toLocaleDateString('en-US'));

    // Calculate pending tasks
    this.taskStats.pending = this.listTask.filter(task => task.status === TaskStatus.Pending).length;

    // Calculate completed tasks
    this.taskStats.completed = this.listTask.filter(task => task.status === TaskStatus.Completed).length;

    // Calculate overdue tasks
    this.taskStats.overdue = this.listTask.filter(task =>
      task.status === TaskStatus.Pending && formatDate(new Date(task.createdAt)) < formatDate(now)
    ).length;

    console.log('Calculated task stats:', this.taskStats);
  }
}
