import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ServerResponseGameListing, ServerResponseGameProject } from "src/app/models/game/game";
import { ApiService } from "src/app/services/api.service";
import { DialogService } from "src/app/services/dialog.service";
import { GameEntry, GameListing, GameType } from "../../../../../../../../commons/src/models/game/game";
import { GameProject } from "../../../../../../../../commons/src/models/game/project";
import { GameEditResourcesComponent } from "./resources.component";

type Params = {
  [key: string]: any;
};

function createGameEntry(name: string): GameEntry{
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

function createGameProject(): GameProject{
  return new GameProject('', [], []);
}

function createGameListing(name: string): GameListing{
  return { project: createGameProject(), entry: createGameEntry(name) };
}

class MockAPIService{
  game = {
    getGame: (gameId: string | number): Observable<ServerResponseGameListing> => {
      return new Observable<ServerResponseGameListing>(s => {
        s.next({
          success: true,
          code: 200,
          description: '',
          data: createGameListing('Test Game')
        });
      });
    }
  };

  editor = {
    uploadGameResource: (data: FormData, progressCallback: (progress: number) => void): Observable<ServerResponseGameProject> => {
      return new Observable<ServerResponseGameProject>(s => {
        s.next({
          success: true,
          code: 200,
          description: '',
          data: createGameProject()
        })
      });
    }
  }
}

describe('GameEditResourcesComponent', () => {
  let component: GameEditResourcesComponent;
  let fixture: ComponentFixture<GameEditResourcesComponent>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>

  beforeEach(async () => {
    dialogServiceSpy = jasmine.createSpyObj<DialogService>('DialogService', ['showDismissable']);

    let activatedRoute = {
      queryParams: new Observable<Params>(s => s.next({ gameId: 1 })),
      
    };

    await TestBed.configureTestingModule({
      declarations: [GameEditResourcesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: ApiService, useClass: MockAPIService },
        { provide: DialogService, dialogServiceSpy },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['error']) }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameEditResourcesComponent);
    component = fixture.componentInstance;
  })

  it('test', () => {

  });
});