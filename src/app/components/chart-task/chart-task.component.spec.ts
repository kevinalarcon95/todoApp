import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from 'src/app/services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartTaskComponent } from '../chart-task/chart-task.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('ChartTaskComponent', () => {
  let component: ChartTaskComponent;
  let fixture: ComponentFixture<ChartTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChartTaskComponent],
      providers: [TaskService]
    });
    fixture = TestBed.createComponent(ChartTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [DashboardComponent, ChartTaskComponent],
  });
});
