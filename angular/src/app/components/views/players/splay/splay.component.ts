import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as phaser from 'phaser';
import { ApiService } from 'src/app/services/api.service';
import { io, Socket } from 'socket.io-client';
import { UserService } from 'src/app/services/user.service';

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
  private destroyableSockets: Socket[] = [];
  private playNonce: string | undefined;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
    this.runOutside(() => {
      // const phaserConfig: phaser.Types.Core.GameConfig = {
      //   type: Phaser.AUTO,
      //   backgroundColor: "#5DACD8",
      //   width: 400,
      //   height: 300,
      //   parent: "canvas-container",
      //   scene: [ ],
      //   fps: {
      //     target: 25,
      //     forceSetTimeOut: true
      //   },
      // };

      // const game = new Phaser.Game(phaserConfig);
    }); 
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

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event){
    this.manualDestroyGameSession();
  }

  /* **** Private Methods **** */

  private loadData(){
    this.activatedRoute.params.subscribe(data => {
      this.sessionId = data.sessionid as string;
      console.log("Loaded Single Play Session Component with session id:", this.sessionId);

      this.initSocketConnection();
      this.loadGame();
    });
  }

  private loadGame(){
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
    (window as any).EdgeProxy.unloadGame();
  }

  private initSocketConnection(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const ioUsageAddress = ApiService.getSocketURL() + '/usage';
      const ioChatsAddress = ApiService.getSocketURL() + '/chats';
      const authData = this.userService.getUserAndToken();
      
      // Usage Tracker socket
      const usageSocket = io(ioUsageAddress, {
        autoConnect: true,
        auth: {
          uid: authData.user.userId!,
          auth: authData.token!,
          sessionId: this.sessionId!
        }
      });
      usageSocket.on('play-nonce', ({nonce}) => {
        this.playNonce = nonce;
        console.log("Received playnonce:", nonce as string);
        resolve(nonce);
      });
      usageSocket.on('connect_error', (error) => {
        reject(error);
      });

      // Chats socket
      // todo
      // const 
  
      
      this.destroyableSockets.push(usageSocket);
    });
  }

}
