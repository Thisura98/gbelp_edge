import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ARTICLES_SERVER_PATH_CONST } from "../../../../commons/src/models/articles";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService{
  public constructor(
    private http: HttpClient
  ){}

  public getArticle(url: string): Observable<string>{
    return new Observable<string>((sub) => {
      this.http.get(
        url, 
        { responseType: 'text' }
      ).subscribe(data => {
        sub.next(this.replaceServerBaseURL(data));
      })
    });
  }

  private replaceServerBaseURL(content: string): string{
    return content.replace(ARTICLES_SERVER_PATH_CONST, this.getServerPath());
  }

  private getServerPath(): string{
    return ApiService.getBaseURL();
  }
}