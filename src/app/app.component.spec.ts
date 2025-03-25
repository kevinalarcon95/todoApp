import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  template: '<p>Mock Dashboard Component</p>'
})
class MockDashboardComponent {}

@Component({
  template: '<p>Mock Tasks Component</p>'
})
class MockTasksComponent {}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the sidebar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
  });
});

describe('AppComponent Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: MockDashboardComponent },
          { path: 'tasks', component: MockTasksComponent }
        ])
      ],
      declarations: [AppComponent, MockDashboardComponent, MockTasksComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "dashboard" and render the MockDashboardComponent', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    router.navigate(['dashboard']);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(location.path()).toBe('/dashboard');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Mock Dashboard Component');
  });

  it('should navigate to "tasks" and render the MockTasksComponent', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    router.navigate(['tasks']);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(location.path()).toBe('/tasks');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Mock Tasks Component');
  });
});
