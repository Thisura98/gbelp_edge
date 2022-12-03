import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as phaser from 'phaser';
import { ApiService } from 'src/app/services/api.service';
import { io, Socket } from 'socket.io-client';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { GameSession } from '../../../../../../../commons/src/models/session';
import { ServerResponse } from 'src/app/models/common-models';
import { ChatGroupType, ChatMessage } from '../../../../../../../commons/src/models/chat';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { PlayerChatPanelComponent } from '../panels/chat/chat.panel.component';
import { GameListing } from '../../../../../../../commons/src/models/game/game';
import { QueryKey } from 'src/app/constants/constants';
import { ProgressfulGameObjective } from '../../../../../../../commons/src/models/game/objectives';
import { combineLatest } from 'rxjs';
import { ProgressfulGameGuidanceTracker } from '../../../../../../../commons/src/models/game/trackers';
import { PlayService } from 'src/app/services/play.service';

type EdgeSocket = Socket<DefaultEventsMap, DefaultEventsMap>

/**
 * Singleplayer Game Player
 * 
 * Phaser version: 3.55.2
 */
@Component({
  selector: 'app-splay',
  templateUrl: './splay.component.html',
  styleUrls: ['../player.common.css']
})
export class SplayComponent implements OnInit, AfterViewInit, OnDestroy {
  
  sessionId: string | undefined;
  panelExpanded: boolean = false;
  panelTitle: string = '';
  game: GameListing | undefined;

  isTestSession: boolean = false;

  chats: ChatMessage[] = [];
  objectives: ProgressfulGameObjective[] = [];
  guidanceTrackers: ProgressfulGameGuidanceTracker[] = [];
  activeGuidance: ProgressfulGameGuidanceTracker | undefined;

  @ViewChild(PlayerChatPanelComponent)
  chatPanel: PlayerChatPanelComponent | undefined;
  
  /**
   * Unique 'nonce' for this session. 
   * Retrieved through the socket io API.
   * 
   * Used for relating game statistics 
   * to a single 'play session'.
   */
  private playNonce: string | undefined;

  private session: GameSession | undefined;
  private destroyableSockets: Socket[] = [];
  private chatSocket: EdgeSocket | undefined;

  constructor(
    private elementRef: ElementRef,
    private changeDetectionRef: ChangeDetectorRef,
    private zone: NgZone,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService,
    private playService: PlayService,
  ) { }

  ngOnInit(): void {
    if (!this.userService.getIsLoggedIn()){
      this.logoutOfPlayWithReason("You must login or register before parcitipating in play sessions.");
      return;
    }
    this.loadData();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }

  ngOnDestroy(){
    this.manualDestroyGameSession();
  }

  goBack(){
    this.manualDestroyGameSession();
    window.close();

    // if (this.isTestSession)
    //   window.close();

    // if (this.router.navigated)
    //   this.location.back()
    // else
    //   this.router.navigate(['dashboard']);
  }

  chatButtonPressed(){
    this.expandPanel("Chats");
  }

  objectivesButtonPressed(){
    this.expandPanel("Objectives");
  }
  
  guidanceButtonPressed(){
    this.expandPanel("Guidance");

  }

  sendChatMessage(message: ChatMessage){
    this.chats.push(message);
    this.chatSocket!.emit('chat-add', message);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event){
    this.manualDestroyGameSession();
  }

  /* **** Private Methods **** */

  private loadData(){
    this.activatedRoute.queryParamMap.subscribe(data => {
      if (data.has(QueryKey.testSession))
        this.isTestSession = data.get(QueryKey.testSession) == 'true';
    });

    this.activatedRoute.params.subscribe(data => {
      this.sessionId = data.sessionid as string;
      console.log("Loaded Single Play Session Component with session id:", this.sessionId);

      this.initSocketConnection().then(_ => {
        this.loadGame();
      });
    });
  }

  /**
   * Get the session then,
   * Get the game then,
   * Get objectives & trackers then,
   * Get the game JS
   */
  private loadGame(){
    this.playService.setNonceAndSession(this.playNonce ?? '', this.sessionId ?? '');
    this.apiService.session.getSession(this.sessionId!).subscribe(sessionResponse => {
      if (!sessionResponse.success){
        this.handleLoadError(sessionResponse, 'Sessions');
        return;
      }

      this.session = sessionResponse.data;
      this.loadObjectivesAndTrackers().then(() => {
        this.apiService.game.getGame(this.session!.game_entry_id).subscribe(gameResponse => {
          if (!gameResponse.success){
            this.handleLoadError(gameResponse, 'Games');
            return;
          }
  
          this.game = gameResponse.data;

          this.playService.injectWindowEdgeInternals(
            this.handleChangeDetectionRequest, 
            this.handleGameCompletedNotification
          );
          this.loadCompiledGame();
        }, err => this.handleLoadServerError(err, 'Games'))
      });
    }, err => this.handleLoadServerError(err, 'Sessions'))
  }

  /**
   * Fetch the Game Objectives & Guidance Trackers, then
   * transform them to progressful versions.
   */
  private loadObjectivesAndTrackers(): Promise<void>{
    const gameId = this.session!.game_entry_id;
    return new Promise<void>((resolve, reject) => {
      combineLatest([
        this.apiService.game.getObjectives(gameId),
        this.apiService.game.getGuidanceTrackers(gameId)
      ])
      .subscribe((res) => {
        
        const objectivesResponse = res[0];
        const guidanceTrackersResponse = res[1];

        if (objectivesResponse.success && guidanceTrackersResponse.success){
          this.objectives = objectivesResponse.data.map(v => ProgressfulGameObjective.from(v));
          this.guidanceTrackers = guidanceTrackersResponse.data.map(v => ProgressfulGameGuidanceTracker.from(v));

          // demo code
          // if (this.guidanceTrackers.length > 0){
          //   this.activeGuidance = this.guidanceTrackers[0];
          // }
          // end demo code

          this.playService.buildCache(this.objectives, this.guidanceTrackers);
          resolve();
        }
        else{
          if (!objectivesResponse.success)
            this.handleLoadError(objectivesResponse, 'Objectives')
          else if(!guidanceTrackersResponse.success)
            this.handleLoadError(guidanceTrackersResponse, 'Guidance Trackers')
          reject();
        }

      }, error => {
        this.handleLoadServerError(error, 'Objectives and Guidance Trackers')
        reject();
      });
    });
  }

  private handleLoadError<T>(response: ServerResponse<T>, entityName: string){
    const defaultMessage = `Could not get ${entityName}`;
    const msg = response.description ?? defaultMessage;

    this.dialogService.showDismissable(
      "Data Loading Error",
      msg,
      () => this.router.navigate(['/dashboard'])
    );
  }

  private handleLoadServerError(error: any, entityName: string){
    const msg = typeof error == 'string' ? error : JSON.stringify(error);
    this.dialogService.showDismissable(
      `Error white loading ${entityName}`,
      msg,
      () => this.router.navigate(['/dashboard'])
    );
  }

  /**
   * Retrieves a fresh build of the game and 
   * loads it in the current browser window.
   */
  private loadCompiledGame(){
    // this.dialogService.showSnackbar("Game load temporarily disabled");
    // return;
    this.apiService.play.getCompiledGameJS(this.sessionId!).subscribe(gameJS => {
      console.log("Received game JS!");
      console.log("Game JS length: ", gameJS.length, "character(s)");

      this.handleErrors();
      this.runOutside(() => {
        eval(gameJS);
      });
    });
  }

  private runOutside(fn: CallableFunction){
    // Do not pass fn() to runOutsideAngular directly.
    // zonejs requires a reference to the current calling zone,
    // so wrap it inside another function.
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }

  private handleErrors(){
    window.onerror = (event, source, linno, colno, error) => {
      this.dialogService.showDismissable(
        "Error occurred in game",
        error!.stack!,
        () => {
          window.location = window.location;
        }
      );
    };
  }

  private manualDestroyGameSession(){
    this.destroyableSockets.forEach(s => {
      s.disconnect();
    })
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    (window as any).EdgeProxy?.unloadGame();
  }

  private logoutOfPlayWithReason(reason: string){
    this.dialogService.showDismissable(
      'Cannot Continue',
      reason,
      () => {
        this.userService.routeOutIfLoggedOut();
      }
    )
  }

  private expandPanel(item: string){
    if (this.panelExpanded && this.panelTitle == item){
      this.panelExpanded = false;
      return;
    }

    this.panelExpanded = true;
    this.panelTitle = item;

    if (this.panelTitle == 'Chats'){
      this.chatPanel?.scrollToBottom();
    }
  }

  private initSocketConnection(): Promise<any>{
    return this.getGameUsageSocket().then(() => {
      return this.getChatsSocket();
    }).catch(err => {
      this.dialogService.showDismissable(
        "Socket Error", 
        "Could not setup socket connections", 
        () => {
        this.userService.clearCredentials();
        this.userService.routeOutIfLoggedOut();
      })
    })
  }

  /**
   * Initialize the Game Usage Tracking Socket
   */
  private getGameUsageSocket(): Promise<EdgeSocket>{
    return new Promise<EdgeSocket>((resolve, reject) => {
      const authData = this.userService.getUserAndToken();
      const ioUsageAddress = ApiService.getSocketURL() + '/usage';
      const usageSocket = io(ioUsageAddress, {
        autoConnect: true,
        auth: {
          uid: authData.user.userId ?? '',
          auth: authData.token ?? '',
          sessionId: this.sessionId ?? ''
        }
      });

      this.destroyableSockets.push(usageSocket);

      usageSocket.on('play-nonce', ({nonce}) => {
        this.playNonce = nonce;
        resolve(usageSocket);
      });
      usageSocket.on('connect_error', (error) => {
        reject(error);
      });

    });
  }

  /**
   * Initilize the Chats Socket
   */
  private getChatsSocket(): Promise<EdgeSocket>{
    return new Promise<EdgeSocket>((resolve, reject) => {
      const ioChatsAddress = ApiService.getSocketURL() + '/chats';
      const authData = this.userService.getUserAndToken();
      const chatsSocket = io(ioChatsAddress, {
        autoConnect: true,
        auth: {
          uid: authData.user.userId ?? '',
          auth: authData.token ?? '',
          type: ChatGroupType.chatAtSessionLevel,
          key: this.sessionId ?? ''
        }
      });

      this.destroyableSockets.push(chatsSocket);
      this.chatSocket = chatsSocket;

      chatsSocket.on('chat-did-add', (message) => {
        this.zone.run(() => {
          this.chats.push(message);
          this.chatPanel?.scrollToBottom();
        });
      })
      chatsSocket.on('chat-init', (currentMessages) => {
        this.zone.run(() => {
          this.chats = currentMessages;
        })
        resolve(chatsSocket);
      })
      chatsSocket.on('connect_error', (error) => {
        reject(error);
      })
    })
  }

  private handleChangeDetectionRequest(){
    this.zone.run(() => {
      this.changeDetectionRef.markForCheck();
    })
  }

  private handleGameCompletedNotification(message: string, data: object | null | undefined){
    this.zone.run(() => {
      this.dialogService.showDismissable(
        'Game Completed',
        message,
        () => this.navigateToReportsAndClose()
      )
    });
  }

  private navigateToReportsAndClose(){
    const route = this.router.createUrlTree(['groups/reports/available'], {
      queryParams: {
        groupId: this.session!.group_id,
        sessionId: this.session!.session_id
      }
    })
    .toString();

    window.open(route, '_blank');
    this.goBack();
  }

}
