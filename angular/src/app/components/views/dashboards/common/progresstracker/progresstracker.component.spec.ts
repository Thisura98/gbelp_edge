import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresstrackerComponent } from './progresstracker.component';

describe('ProgresstrackerComponent', () => {
  let component: ProgresstrackerComponent;
  let fixture: ComponentFixture<ProgresstrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgresstrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresstrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
