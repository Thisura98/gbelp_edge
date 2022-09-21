import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { ActivatedRoute, Router } from "@angular/router"
import { DashboardgamesComponent } from "./dashboardgames.component"
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DialogService } from "src/app/services/dialog.service";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { Observable } from "rxjs";
import { ViewMode } from "src/app/constants/constants";
import { ApiService } from "src/app/services/api.service";
import { ServerResponseAllGameEntries } from "src/app/models/game/game";
import { GameEntry, GameType } from "../../../../../../../../commons/src/models/game/game";
import { By } from "@angular/platform-browser";

function createGame(name: string): GameEntry{
  return new GameEntry(
    1,
    '1',
    name,
    GameType.Singleplayer,
    false,
    false,
    '2',
    1, 1, 1, 1, 1,
    1, 1, 1, 1,
  );
}

const allGamesResponse: ServerResponseAllGameEntries = {
  success: true,
  description: 'Success!',
  code: 200,
  data: [
    createGame('Game 1 - ABCDE'), createGame('Game 2 - ABCD'),
    createGame('Game 3 - ABC'), createGame('Game 4 - FGH')
  ]
};

class MockGameApiService{
  public game = {
    getAllGames: (isTemplate: boolean, authorId: string | null = null): Observable<ServerResponseAllGameEntries> => {
      return new Observable<ServerResponseAllGameEntries>(s => s.next(allGamesResponse));
    }
  }
}

describe('DashboardgamesComponent', () => {

  let component: DashboardgamesComponent
  let fixture: ComponentFixture<DashboardgamesComponent>

  let routerSpy: jasmine.SpyObj<Router>
  let dialogServiceSpy: jasmine.SpyObj<DialogService>
  let mockServiceAPI: ApiService

  beforeEach(() => {

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    dialogServiceSpy = jasmine.createSpyObj<DialogService>('DialogService', ['showDismissable']);

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
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: ApiService, useClass: MockGameApiService }
      ],
    });

    fixture = TestBed.createComponent(DashboardgamesComponent);
    component = fixture.componentInstance;
    mockServiceAPI = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  // Test 1

  it('should load data', fakeAsync(() => {
    let spy = spyOn(mockServiceAPI.game, 'getAllGames').and.callThrough();

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    let numberOfElements = (fixture.nativeElement as HTMLElement).querySelectorAll('.entry-row').length;

    expect(spy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
    expect(numberOfElements).toEqual(allGamesResponse.data.length);
  }));

  // Test 2

  it('should search for 3 games', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    changeSearchField('ABC');

    fixture.detectChanges();

    let numberOfElements = (fixture.nativeElement as HTMLElement).querySelectorAll('.entry-row').length;

    expect(component.isLoading).toBeFalse();
    expect(numberOfElements).toEqual(3);
  }));

  // Test 3

  it('should search for 1 game', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    changeSearchField('FGH');

    fixture.detectChanges();

    let numberOfElements = (fixture.nativeElement as HTMLElement).querySelectorAll('.entry-row').length;

    expect(component.isLoading).toBeFalse();
    expect(numberOfElements).toEqual(1);
  }));

  function changeSearchField(term: string){
    let searchField = fixture.debugElement.query(By.css('.search-field'));
    let searchFieldInput = searchField.nativeElement as HTMLInputElement;
    searchFieldInput.value = term;
    searchField.triggerEventHandler('input', { target: searchFieldInput });
  }

})