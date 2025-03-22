import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js/auto';
import { Chart } from 'chart.js/dist';

@Component({
  selector: 'app-chart-task',
  templateUrl: './chart-task.component.html',
  styleUrls: ['./chart-task.component.css']
})
export class ChartTaskComponent implements OnInit {
  public chartDoughnut: Chart;
  public chartLabels: string[] = [
    'Tareas por hacer',
    'En revisión',
    'En curso',
    'Finalizada'
  ];

  ngOnInit(): void {
    const data = {
      labels: this.chartLabels,
      datasets: [
        {
          data: [30, 2, 8, 40],
          backgroundColor: ['#E91E63', '#9C27B0', '#FF9800', '#4CAF50']
        }
      ]
    }

    this.chartDoughnut = new Chart('chartDoughnut', {
      type: 'doughnut' as ChartType,
      data: data,
      datasets: [{
        label: 'Tareas',
        data: [30, 2, 8, 40],
        backgroundColor: ['#E91E63', '#9C27B0', '#FF9800', '#4CAF50'],
        borderWidth: 1
      }]
    });

  }

  // chartData: ChartData<'doughnut'> = {
  //   labels: this.chartLabels,
  //   datasets: [
  //     {
  //       data: [30, 2, 8, 40],
  //       backgroundColor: ['#E91E63', '#9C27B0', '#FF9800', '#4CAF50']
  //     }
  //   ]
  // };

  // chartOptions: ChartOptions<'doughnut'> = {
  //   responsive: true,
  //   cutout: '70%', // Ajusta el grosor del donut
  //   plugins: {
  //     legend: {
  //       display: true, // Muestra la leyenda
  //       position: 'top' // Posición de la leyenda
  //     }
  //   }
  // };
}
