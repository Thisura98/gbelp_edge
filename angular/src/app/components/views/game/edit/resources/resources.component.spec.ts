import { CommonModule } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Data, Router, RouterModule } from "@angular/router";
import { ServerResponse } from "src/app/models/common-models";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ServerResponseGameListing, ServerResponseGameProject } from "src/app/models/game/game";
import { ResourceUrlTransformPipe } from "src/app/pipes/resource-url-transform.pipe";
import { ApiService } from "src/app/services/api.service";
import { GameEntryAPIs } from "src/app/services/apis/game-entry.api";
import { DialogService } from "src/app/services/dialog.service";
import { GameEntry, GameListing, GameType } from "../../../../../../../../commons/src/models/game/game";
import { GameProject } from "../../../../../../../../commons/src/models/game/project";
import { GameProjectResource, GameResourceType } from "../../../../../../../../commons/src/models/game/resources";
import { GameEditResourcesComponent } from "./resources.component";
import { ViewMode } from "src/app/constants/constants";

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

function createGameResource(type: GameResourceType): GameProjectResource{
  return new GameProjectResource('', '', '', type)
}

function createGameProject(): GameProject{
  return new GameProject('', [], []);
}

function createGameListing(name: string): GameListing{
  return { project: createGameProject(), entry: createGameEntry(name) };
}

function createResponse<T>(data: T): ServerResponse<T>{
  return {
    success: true,
    code: 200,
    description: '',
    data: data
  };
}

class MockAPIService{
  getFileSystemBaseURL = () => { return '' };

  game = { 
    getGame: (gameId: string | number): Observable<ServerResponseGameListing> => {
      return new Observable<ServerResponseGameListing>(s => {
        s.next(createResponse(createGameListing('test')));
      });
    }
  };

  editor = {
    uploadGameResource: (data: FormData, progressCallback: (progress: number) => void): Observable<ServerResponseGameProject> => {
      progressCallback(1.0);
      return new Observable<ServerResponseGameProject>(s => {
        s.next(createResponse(createGameProject()))
      });
    }
  }
}

describe('GameEditResourcesComponent', () => {
  let component: GameEditResourcesComponent;
  let fixture: ComponentFixture<GameEditResourcesComponent>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let apiService: ApiService;

  beforeEach(async () => {
    dialogServiceSpy = jasmine.createSpyObj<DialogService>('DialogService', ['showSnackbar']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    let activatedRoute = {
      queryParams: new Observable<Params>(s => s.next({ gameId: 1 })),
      data: new Observable<Data>(s => s.next({ mode: ViewMode.GAME }))
    };

    await TestBed.configureTestingModule({

      declarations: [ ResourceUrlTransformPipe, GameEditResourcesComponent ],
      providers: [
        ResourceUrlTransformPipe,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: ApiService, useClass: MockAPIService },
        { provide: DialogService, dialogServiceSpy },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameEditResourcesComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load 2 images and 3 sounds', fakeAsync(() => {
    let spy = spyOn(apiService.game, 'getGame');
    let resources: GameProjectResource[] = [
      createGameResource(GameResourceType.IMAGE),
      createGameResource(GameResourceType.IMAGE),
      createGameResource(GameResourceType.SOUND),
      createGameResource(GameResourceType.SOUND),
      createGameResource(GameResourceType.SOUND),
    ];
    let project: GameProject = new GameProject('0', resources, []);
    let listing: GameListing = { project: project, entry: createGameEntry('') };
    let response = createResponse(listing);
    spy.and.returnValue(new Observable<ServerResponseGameListing>(s => s.next(response)));

    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    let imageElements = fixture.debugElement.queryAll(By.css('.asset-img-container')).length;
    let soundElements = fixture.debugElement.queryAll(By.css('.asset-snd-container')).length;
    
    expect(spy).toHaveBeenCalled();
    expect(imageElements).toEqual(2);
    expect(soundElements).toEqual(3);

  }));

  it('should upload data', fakeAsync(() => {

    let uploadInputFileChangedSpy = spyOn(component, 'uploadInputFileChanged');
    let uploadAPIMethodSpy = spyOn(apiService.editor, 'uploadGameResource');

    const dt = new DataTransfer();
    dt.items.add(new File([], 'file1.png'));

    tick();
    fixture.detectChanges();

    uploadInputFileChangedSpy.and.callThrough();
    uploadAPIMethodSpy.and.callThrough();

    component.uploadInputFileChanged({
      target: {
        files: dt.files
      }
    });

    tick();

    fixture.detectChanges();

    expect(uploadInputFileChangedSpy).toHaveBeenCalledTimes(1);
    expect(uploadAPIMethodSpy).toHaveBeenCalledTimes(1);
    expect(component.uploadProgress).toEqual(1.0);
    expect(toastrServiceSpy.error).toHaveBeenCalled();
  }));
});