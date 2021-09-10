import { AfterViewInit, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as phaser from 'phaser';
import { ApiService } from 'src/app/services/api.service';

/**
 * Singleplayer Game Player
 */
@Component({
  selector: 'app-splay',
  templateUrl: './splay.component.html',
  styleUrls: ['../player.common.css']
})
export class SplayComponent implements OnInit, AfterViewInit {
  
  sessionId: string | undefined;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
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

  goBack(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.manualDestroyGameSession();
    if (this.router.navigated)
      this.location.back()
    else
      this.router.navigate(['dashboard']);
  }

  /* **** Private Methods **** */

  private loadData(){
    this.activatedRoute.params.subscribe(data => {
      this.sessionId = data.sessionid as string;
      console.log("Loaded Single Play Session Component with session id:", this.sessionId);

      this.loadGame()
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
    (window as any).EdgeProxy.unloadGame();
  }

}
