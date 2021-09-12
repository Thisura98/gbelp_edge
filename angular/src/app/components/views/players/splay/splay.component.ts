import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as phaser from 'phaser';
import { ApiService } from 'src/app/services/api.service';
import { io, Socket } from 'socket.io-client';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { GameSession } from '../../../../../../../commons/src/models/session';
import { GameListing } from 'src/app/models/game/game';
import { ServerResponse } from 'src/app/models/common-models';
import { ChatGroupType, ChatMessage } from '../../../../../../../commons/src/models/chat';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

type EdgeSocket = Socket<DefaultEventsMap, DefaultEventsMap>

/**
 * Singleplayer Game Player
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

  chats: ChatMessage[] = [];
  
  private session: GameSession | undefined;
  private destroyableSockets: Socket[] = [];
  private playNonce: string | undefined;
  private levelIndex: number = 0;
  private chatSocket: EdgeSocket | undefined;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private dialogService: DialogService,
  ) { }

  get currentLevelName(): string{
    if (this.game == undefined)
      return '';

    return this.game.project.levels[this.levelIndex].name;
  }

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
    if (this.router.navigated)
      this.location.back()
    else
      this.router.navigate(['dashboard']);
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
    this.chatSocket!.emit('chat-add', message);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event){
    this.manualDestroyGameSession();
  }

  /* **** Private Methods **** */

  private loadData(){
    this.activatedRoute.params.subscribe(data => {
      this.sessionId = data.sessionid as string;
      console.log("Loaded Single Play Session Component with session id:", this.sessionId);

      this.initSocketConnection().then(_ => {
        this.loadGame();
      });
    });
  }

  private loadGame(){
    // Get the session then,
    // get the game then,
    // get the game js.
    this.apiService.getSession(this.sessionId!).subscribe(sessionResponse => {
      if (!sessionResponse.success){
        this.handleLoadError(sessionResponse, 'Sessions');
        return;
      }

      this.session = sessionResponse.data;
      this.apiService.getGame(this.session!.game_entry_id).subscribe(gameResponse => {
        if (!gameResponse.success){
          this.handleLoadError(gameResponse, 'Games');
          return;
        }

        this.game = gameResponse.data;
        this.loadCompiledGame();
      })
    })
  }

  private handleLoadError<T>(response: ServerResponse<T>, entityName: string){
    const defaultMessage = `Could not get ${entityName}`;
    const msg = response.description ?? defaultMessage;

    this.dialogService.showDismissable(
      "Data Loading Error",
      msg,
      () => {
        this.router.navigate(['/dashboard']);
      }
    )
  }

  /**
   * Retrieves a fresh build of the game and 
   * loads it in the current browser window.
   */
  private loadCompiledGame(){
    this.dialogService.showSnackbar("Game load temporarily disabled");
    return;
    this.apiService.getCompiledGameJS(this.sessionId!).subscribe(gameJS => {
      console.log("Received game JS!");
      console.log(gameJS);

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

      chatsSocket.on('chat-init', (currentMessages) => {
        console.log("SOCKETIO", "chat-init", currentMessages);
        resolve(chatsSocket);
      })
      chatsSocket.on('connect_error', (error) => {
        reject(error);
      })
    })
  }

}
