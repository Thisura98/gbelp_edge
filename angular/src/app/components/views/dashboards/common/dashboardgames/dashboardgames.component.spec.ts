import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute, Router } from "@angular/router"
import { DashboardgamesComponent } from "./dashboardgames.component"
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DialogService } from "src/app/services/dialog.service";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { Observable } from "rxjs";
import { ViewMode } from "src/app/constants/constants";

describe('DashboardgamesComponent', () => {

  let component: DashboardgamesComponent
  let fixture: ComponentFixture<DashboardgamesComponent>

  let routerSpy: jasmine.SpyObj<Router>
  let dialogService: jasmine.SpyObj<DialogService>

  beforeEach(() => {

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    dialogService = jasmine.createSpyObj<DialogService>('DialogService', ['showDismissable']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule
      ],
      declarations: [
        DashboardgamesComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {
          data: new Observable(s => s.next( { mode: ViewMode.GAME } ))
        } },
        { provide: DialogService, useValue: dialogService },
      ],
    });
    fixture = TestBed.createComponent(DashboardgamesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

})