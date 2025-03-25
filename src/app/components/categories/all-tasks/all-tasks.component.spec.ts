import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksComponent } from './all-tasks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from 'src/app/services/task.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AllTasksComponent', () => {
  let component: AllTasksComponent;
  let fixture: ComponentFixture<AllTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AllTasksComponent],
      providers: [TaskService]
    });
    fixture = TestBed.createComponent(AllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
