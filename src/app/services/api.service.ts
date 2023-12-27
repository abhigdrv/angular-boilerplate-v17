import { Injectable } from '@angular/core';
import { ConfigService } from '../configs/config.services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseRoute = '/entries';
  constructor(private configServices: ConfigService) {}

  getApiCall(getParams?: any) {
    return this.configServices.readRequest(this.baseRoute + '', getParams).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
