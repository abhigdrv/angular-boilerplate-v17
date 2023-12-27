import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigSettings } from '../configs/config.settings';

@Injectable()
export class MyHttpInterceptorInterceptor implements HttpInterceptor {
  lang: any = 'en';

  constructor(private configSettings: ConfigSettings) {
    this.lang = this.configSettings.getLang();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      authorization: 'tokenDfkTgVf87gT63Hg',
      lang: this.lang,
    });

    const modifiedRequest = request.clone({ headers });

    return next.handle(modifiedRequest);
  }
}
