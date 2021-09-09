import { AfterViewInit, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as phaser from 'phaser';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';



    this.runOutside(() => {
      const phaserConfig: phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#5DACD8",
        width: 400,
        height: 300,
        parent: "canvas-container",
        scene: [ ],
        fps: {
          target: 25,
          forceSetTimeOut: true
        },
      };

      const game = new Phaser.Game(phaserConfig);
    }); 
  }

  /* **** Private Methods **** */

  private loadData(){
    this.activatedRoute.params.subscribe(data => {
      this.sessionId = data.sessionid as string;
      console.log("Loaded Single Play Session Component with session id:", this.sessionId);
    });
  }

  private runOutside(fn: CallableFunction){
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }

}
