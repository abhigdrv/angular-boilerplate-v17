import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ChangeBgColorOnClickDirective } from './directives/change-bg-color-on-click.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptorInterceptor } from './interceptors/my-http.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { UpperCasePipe } from './pipes/upper-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChangeBgColorOnClickDirective,
    HomeComponent,
    ErrorComponent,
    UpperCasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
