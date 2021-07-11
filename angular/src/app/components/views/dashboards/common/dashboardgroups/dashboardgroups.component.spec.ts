import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardgroupsComponent } from './dashboardgroups.component';

describe('DashboardgroupsComponent', () => {
  let component: DashboardgroupsComponent;
  let fixture: ComponentFixture<DashboardgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardgroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
