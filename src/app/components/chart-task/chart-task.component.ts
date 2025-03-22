import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-chart-task',
  templateUrl: './chart-task.component.html',
  styleUrls: ['./chart-task.component.css']
})
export class ChartTaskComponent implements OnInit {
  private chartDoughnut!: Chart;
  private chartLabels: string[] = [
    'Tareas pendientes',
    'Tareas completadas',
    'Tareas vencidas',
  ];

  private chartData: ChartData<'doughnut'> = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [30, 2, 8],
        backgroundColor: ['#E91E63', '#9C27B0', '#FF9800', '#4CAF50']
      }
    ]
  };

  private chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        labels:{
          boxWidth:12,
          font:{
            size:12
          }
        },
        display: true,
        position: 'top'
      }
    }
  };

  ngOnInit(): void {
    const canvas = document.getElementById('chartDoughnut') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chartDoughnut = new Chart(ctx, {
          type: 'doughnut',
          data: this.chartData,
          options: this.chartOptions
        });
      }
    }
  }
}
