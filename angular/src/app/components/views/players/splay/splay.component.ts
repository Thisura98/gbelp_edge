import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }

  /* **** Private Methods **** */

  private loadData(){
    this.activatedRoute.params.subscribe(data => {
      this.sessionId = data.sessionid as string;
      console.log("Loaded Single Play Session Component with session id:", this.sessionId);
    });
  }

}
