import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfigSettings } from '../configs/config.settings';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class MyHttpInterceptorInterceptor implements HttpInterceptor {
  lang: any = 'en';
  private ongoingRequestsCount = new BehaviorSubject<number>(0);

  constructor(
    private configSettings: ConfigSettings,
    private loaderService: LoaderService
  ) {
    this.lang = this.configSettings.getLang();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders({
      authorization: 'tokenDfkTgVf87gT63Hg',
      lang: this.lang,
    });
    this.loaderService.show();
    this.ongoingRequestsCount.next(this.ongoingRequestsCount.value + 1);
    const modifiedRequest = request.clone({ headers });
    return next.handle(modifiedRequest).pipe(
      finalize(() => {
        this.ongoingRequestsCount.next(
          Math.max(0, this.ongoingRequestsCount.value - 1)
        );
        if (this.ongoingRequestsCount.value === 0) {
          this.debounceHide();
        }
      })
    );
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
