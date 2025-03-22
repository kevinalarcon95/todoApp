import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTaskComponent } from './chart-task.component';

describe('ChartTaskComponent', () => {
  let component: ChartTaskComponent;
  let fixture: ComponentFixture<ChartTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartTaskComponent]
    });
    fixture = TestBed.createComponent(ChartTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
