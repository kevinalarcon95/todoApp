import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandingComponent } from './components/branding/branding.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AllTasksComponent } from './components/categories/all-tasks/all-tasks.component';
import { PendingTasksComponent } from './components/categories/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './components/categories/completed-tasks/completed-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandingComponent,
    SidebarComponent,
    AllTasksComponent,
    PendingTasksComponent,
    CompletedTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
