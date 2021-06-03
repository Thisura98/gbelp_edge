import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDialogComponent } from './simple.component';

describe('SimpleComponent', () => {
  let component: SimpleDialogComponent;
  let fixture: ComponentFixture<SimpleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
