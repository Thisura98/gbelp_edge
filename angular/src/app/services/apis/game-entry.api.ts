import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServerResponsePlain } from "src/app/models/common-models";
import { ServerResponseAllGameEntries, ServerResponseGameCreate, ServerResponseGameListing, ServerResponseGetGuidanceTrackers, ServerResponseGetObjectives } from "src/app/models/game/game";
import { APIBase } from "./base.api";

export class GameEntryAPIs implements APIBase {

  http!: HttpClient;
  aurl!: (endpoint: string) => string;
  getHeaders!: () => HttpHeaders;

  constructor(){}

  createGame(data: any): Observable<ServerResponseGameCreate> {
    const url = this.aurl('create-game');
    return this.http.post<ServerResponseGameCreate>(url, data, {
      headers: this.getHeaders()
    })
  }

  saveGame(data: any): Observable<ServerResponsePlain> {
    const url = this.aurl('save-game');
    return this.http.put<ServerResponsePlain>(url, data, {
      headers: this.getHeaders()
    })
  }

  deleteGame(gameId: string): Observable<ServerResponsePlain> {
    const url = this.aurl(`delete-game?gameId=${gameId}`);
    return this.http.delete<ServerResponsePlain>(url, {
      headers: this.getHeaders()
    });
  }

  getGame(gameId: number | string): Observable<ServerResponseGameListing> {
    const url = this.aurl('game-listing');
    return this.http.get<ServerResponseGameListing>(url, {
      headers: this.getHeaders(),
      params: { id: gameId }
    });
  }

  getAllGames(isTemplates: boolean | null = false, authorId: string | null = null): Observable<ServerResponseAllGameEntries> {
    const url = this.aurl('all-games');
    let params = new HttpParams();
    if (isTemplates == null)
      params = params.set('is_template', '');
    else
      params = params.set('is_template', isTemplates ? '1' : '0');

    if (authorId != null)
      params = params.set('author', authorId);

    return this.http.get<ServerResponseAllGameEntries>(url, {
      headers: this.getHeaders(),
      params: params
    });
  }

  getObjectives(gameId: string | number): Observable<ServerResponseGetObjectives> {
    const url = this.aurl('game-objectives');
    return this.http.get<ServerResponseGetObjectives>(url, {
      headers: this.getHeaders(),
      params: {
        gameId: gameId
      }
    });
  }

  getGuidanceTrackers(gameId: string | number): Observable<ServerResponseGetGuidanceTrackers> {
    const url = this.aurl('game-guidance-trackers');
    return this.http.get<ServerResponseGetGuidanceTrackers>(url, {
      headers: this.getHeaders(),
      params: {
        gameId: gameId
      }
    });
  }
}