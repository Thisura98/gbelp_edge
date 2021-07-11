import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardgamesComponent } from './dashboardgames.component';

describe('DashboardgamesComponent', () => {
  let component: DashboardgamesComponent;
  let fixture: ComponentFixture<DashboardgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardgamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
