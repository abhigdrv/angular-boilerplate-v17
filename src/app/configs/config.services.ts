import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigSettings } from './config.settings';
import { CacheStorageService } from '../services/cache-storage.service';
import { getValue } from './helper';

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

  constructor(
    private http: HttpClient,
    public configSettings: ConfigSettings,
    private cacheStorageService: CacheStorageService,
  ) {}

  private getCompleteUrl(url: string, params: any): string {
    const serializedParams = this.serializeParams(params);
    return (
      this.API_URL +
      this.baseRoute +
      url +
      (serializedParams ? '?' + serializedParams : '')
    );
  }

  private serializeParams(params: any): string {
    return Object.keys(params)
      .filter((key) => params.hasOwnProperty(key))
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`,
      );
    }
    return throwError(() => error);
  }

  readRequest(url: string, params?: any): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(this.getCompleteUrl(url, params), { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  readExternalRequest(
    url: string,
    params: Object,
  ): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.getCompleteUrl(url, params), {
      observe: 'response',
    });
  }

  postRequest(url: string, getParams: any, postParams: any): Observable<any> {
    if (!('lang' in getParams)) {
      getParams.lang = this.configSettings._lang;
    }
    return this.http
      .post<any>(
        this.getCompleteUrl(url, getParams),
        postParams,
        this.httpOptions,
      )
      .pipe(catchError(this.handleError));
  }

  putRequest(url: string, getParams: Object, postParams: any): Observable<any> {
    return this.http
      .put<any>(
        this.getCompleteUrl(url, getParams),
        postParams,
        this.httpOptions,
      )
      .pipe(catchError(this.handleError));
  }

  deleteRequest(url: string, params: Object): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(this.getCompleteUrl(url, params), { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  getApiPromise(
    cacheName: any,
    apiCallMethod: () => any,
    keys?: string[],
  ) {
    return new Promise((resolve) => {
      this.cacheStorageService
        .getFromCache(cacheName)
        .then(async (cachedData: any) => {
          if (cachedData && environment.cacheEnable) {
            if (
              cachedData &&
              cachedData != undefined &&
              cachedData != 'undefined'
            ) {
              resolve(cachedData);
            }
          } else {
            apiCallMethod().subscribe({
              next: (res: any) => {
                if (res.body.statusCode == 200 || res.statusCode == 200 || res.status == 200 || res.body.status == 200) {
                  if (keys && keys.length > 0) {
                    res = getValue(res, keys);
                  }
                  if (environment.cacheEnable) {
                    this.cacheStorageService
                      .addToCache(cacheName, res)
                      .then(() => {
                        console.info(cacheName + ' added to Cache');
                      })
                      .catch((error) => {
                        console.log(
                          `Error occurred while adding ${cacheName} to cache with error ${error}`,
                        );
                      });
                  }
                  resolve(res);
                }
              },
              error: (err: any) => {
                console.error(
                  'Failed to connect with API server with error:',
                  err,
                );
              },
              complete: () => {
                // Handle completion if needed
              },
            });
          }
        });
    });
  }

  getLang(): string {
    return 'en';
  }
}
