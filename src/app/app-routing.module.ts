import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AllTasksComponent } from './components/categories/all-tasks/all-tasks.component';
import { PendingTasksComponent } from './components/categories/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './components/categories/completed-tasks/completed-tasks.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'resumen', component: LandingComponent },
  { path: 'tareas', component: AllTasksComponent },
  { path: 'tareas-pendientes', component: PendingTasksComponent },
  { path: 'tareas-completadas', component: CompletedTasksComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
