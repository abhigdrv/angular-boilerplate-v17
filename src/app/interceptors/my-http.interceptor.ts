import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { finalize, mergeMap, tap } from 'rxjs/operators';
import { ConfigSettings } from '../configs/config.settings';
import { LoaderService } from '../services/loader.service';
import { CacheStorageService } from '../services/cache-storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class MyHttpInterceptorInterceptor implements HttpInterceptor {
  lang: any = 'en';
  private ongoingRequestsCount = new BehaviorSubject<number>(0);

  constructor(
    private configSettings: ConfigSettings,
    private cacheStorageService: CacheStorageService,
    private loaderService: LoaderService
  ) {
    this.lang = this.configSettings.getLang();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
      let cacheName = String(request.urlWithParams);
      return from(this.cacheStorageService.getFromCache(cacheName)).pipe(
        mergeMap((cachedData: any) => {
          if (cachedData && environment.cache.enable) {
            return of(new HttpResponse({ body: cachedData }));
          } else {
            return next.handle(request).pipe(
              tap((event) => {
                if (event instanceof HttpResponse && environment.cache.enable) {
                  this.cacheStorageService.addToCache(cacheName, event.body);
                }
              })
            );
          }
        })
      );
    }
    if((request.method === 'POST' || request.method === 'PUT') && environment.cache.clearOnPost){
      this.cacheStorageService.clearCache();
    }
    let headers = this.getHeader();
    this.startLoader();
    const modifiedRequest = request.clone({ headers });
    return next.handle(modifiedRequest).pipe(
      finalize(() => {
        this.stopLoader();
      })
    );
  }

  private getHeader(){
    return new HttpHeaders({
      authorization: 'tokenDfkTgVf87gT63Hg',
      lang: this.lang,
    });
  }

  private startLoader(){
    this.loaderService.show();
    this.ongoingRequestsCount.next(this.ongoingRequestsCount.value + 1);
  }

  private stopLoader(){
    this.ongoingRequestsCount.next(
      Math.max(0, this.ongoingRequestsCount.value - 1)
    );
    if (this.ongoingRequestsCount.value === 0) {
      this.debounceHide();
    }
  }

  private debounceHide = (() => {
    let timeoutId: any;    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (this.ongoingRequestsCount.value === 0) {
          this.loaderService.hide();
        }
      }, 1000);
    };
  })();
}
