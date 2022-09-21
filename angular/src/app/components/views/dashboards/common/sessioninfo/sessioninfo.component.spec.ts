import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_IMPORTS } from 'src/app/constants/modules.imports';

import { SessioninfoComponent } from './sessioninfo.component';

describe('SessioninfoComponent', () => {
  let component: SessioninfoComponent;
  let fixture: ComponentFixture<SessioninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessioninfoComponent ],
      imports: [ ...APP_IMPORTS ]
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
