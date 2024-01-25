import { Injectable } from '@angular/core';
import { ConfigService } from '../configs/config.services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseRoute = '';
  constructor(private configServices: ConfigService) {}

  getEntriesPublicApiCall(getParams?: any) {
    return this.configServices
      .readRequest(this.baseRoute + 'facts', getParams)
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }
}
