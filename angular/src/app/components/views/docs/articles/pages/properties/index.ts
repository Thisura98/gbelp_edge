import { Component, OnInit, Output } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ArticlesService } from "src/app/services/articles.service";

@Component({
  template: `
  <markdown [data]="content">
  </markdown>
  `,
  styleUrls: ['../../articles.docs.component.css'],
})
export class PropertiesArticleComponent implements OnInit{

  readonly fileUrl: string = `${ApiService.getBaseURL()}/fs/articles/properties/index.md`;
  content = '';

  constructor(
    private articles: ArticlesService
  ){}

  ngOnInit(){
    this.articles.getArticle(this.fileUrl).subscribe(data => {
      this.content = data;
    });
  }
}