import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessioninfoComponent } from './sessioninfo.component';

describe('SessioninfoComponent', () => {
  let component: SessioninfoComponent;
  let fixture: ComponentFixture<SessioninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessioninfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessioninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
