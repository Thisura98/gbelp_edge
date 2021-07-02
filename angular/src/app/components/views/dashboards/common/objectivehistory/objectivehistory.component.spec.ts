import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivehistoryComponent } from './objectivehistory.component';

describe('ObjectivehistoryComponent', () => {
  let component: ObjectivehistoryComponent;
  let fixture: ComponentFixture<ObjectivehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectivehistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
