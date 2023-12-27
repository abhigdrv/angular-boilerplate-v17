import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigSettings } from './config.settings';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private API_URL = environment.apiUrl || '';
  public baseRoute = '';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, public configSettings: ConfigSettings) {}

  private getCompleteUrl(url: string, params: any): string {
    const serializedParams = this.serializeParams(params);
    return this.API_URL + this.baseRoute + url + (serializedParams ? '?' + serializedParams : '');
  }

  private serializeParams(params: any): string {
    return Object.keys(params)
      .filter(key => params.hasOwnProperty(key))
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => error);
  }

  readRequest(url: string, params?: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.getCompleteUrl(url, params), { observe: 'response' }).pipe(catchError(this.handleError));
  }

  readExternalRequest(url: string, params: Object): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.getCompleteUrl(url, params), { observe: 'response' });
  }

  postRequest(url: string, getParams: any, postParams: any): Observable<any> {
    if (!('lang' in getParams)) {
      getParams.lang = this.configSettings._lang;
    }
    return this.http.post<any>(this.getCompleteUrl(url, getParams), postParams, this.httpOptions).pipe(catchError(this.handleError));
  }

  putRequest(url: string, getParams: Object, postParams: any): Observable<any> {
    return this.http.put<any>(this.getCompleteUrl(url, getParams), postParams, this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteRequest(url: string, params: Object): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.getCompleteUrl(url, params), { observe: 'response' }).pipe(catchError(this.handleError));
  }

  getLang(): string {
    return 'en';
  }
}
