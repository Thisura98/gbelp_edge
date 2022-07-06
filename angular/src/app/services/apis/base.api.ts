import { HttpClient, HttpHeaders } from "@angular/common/http";

export interface APIBase{
  http: HttpClient;
  aurl: (endpoint: string) => string;
  getHeaders: () => HttpHeaders;
}