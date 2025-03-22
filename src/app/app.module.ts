import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AllTasksComponent } from './components/categories/all-tasks/all-tasks.component';
import { PendingTasksComponent } from './components/categories/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './components/categories/completed-tasks/completed-tasks.component';
import { ChartTaskComponent } from './components/chart-task/chart-task.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SidebarComponent,
    AllTasksComponent,
    PendingTasksComponent,
    CompletedTasksComponent,
    ChartTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
