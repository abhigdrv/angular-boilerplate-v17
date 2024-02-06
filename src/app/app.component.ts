import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-boilerplate-v17';
  showLoader:boolean = true;
  constructor(
    private loaderService:LoaderService,
    private cdr: ChangeDetectorRef
  ){}

  ngAfterViewInit(): void {
    this.loaderService.getData().subscribe((data) => {
      setTimeout(() => {
        this.showLoader = data;
        this.cdr.detectChanges();
      });
    });
    console.log("%cSTOP!", "color:red;font-size:xx-large;font-weight:bold;")
    console.log("%cThis is a browser feature intended for developers. Do not enter or paste code which you don't understand. It may allow attackers to steal your information or impersonate you.\nSee https://en.wikipedia.org/wiki/Self-XSS for more details", "font-size:large;")
  }
}
