import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  templateUrl: './index.html',
  styleUrls: ['../../../articles.docs.component.css'],
})
export class ScriptReferenceArticleComponent implements OnInit{

  @Output()
  titleElements = new EventEmitter<NodeListOf<Element>>();

  constructor(){}

  ngOnInit(){
    const elements = document.querySelectorAll('h1,h2,h3');
    this.titleElements.emit(elements);
  }
}