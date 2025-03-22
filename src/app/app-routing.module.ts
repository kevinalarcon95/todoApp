import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AllTasksComponent } from './components/categories/all-tasks/all-tasks.component';
import { PendingTasksComponent } from './components/categories/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './components/categories/completed-tasks/completed-tasks.component';
//import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LandingComponent },                // Página de bienvenida/instructivo
  { path: 'home', component: LandingComponent },            // Página de bienvenida/instructivo
  { path: 'tareas', component: AllTasksComponent },            // Todas las tareas
  { path: 'tareas-pendientes', component: PendingTasksComponent }, // Tareas pendientes
  { path: 'tareas-completadas', component: CompletedTasksComponent }, // Tareas completadas
  //{ path: 'login', component: LoginComponent },                // Login
  { path: '**', redirectTo: '' }                               // Ruta comodín, redirige a Branding
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
