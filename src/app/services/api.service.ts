import { Injectable } from '@angular/core';
import { ConfigService } from '../configs/config.services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseRoute = '';
  constructor(private configServices: ConfigService) {}
}
