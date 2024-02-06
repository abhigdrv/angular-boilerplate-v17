import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader:boolean = false
  private displayLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loader);
  constructor() { }

  show(): void {
    this.loader = true
    this.displayLoader.next(true);
  }

  hide(): void {
    this.loader = false
    this.displayLoader.next(false);
  }

  getData(): Observable<boolean> {
    return this.displayLoader.asObservable();
  }
}
