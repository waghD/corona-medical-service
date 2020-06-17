import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Helper } from 'src/app/shared/models/helper.model';
import { Observable } from 'rxjs';

@Injectable()
export class HelpersService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getHelpers(): Observable<Helper[]> {
    const helpers = this.apiConnection.getHelpers();
    return helpers;
  }
}
