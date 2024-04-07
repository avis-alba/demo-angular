import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetChartComponent } from './budget-chart.component';

describe('BudgetChartComponent', () => {
  let component: BudgetChartComponent;
  let fixture: ComponentFixture<BudgetChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetChartComponent]
    });
    fixture = TestBed.createComponent(BudgetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
