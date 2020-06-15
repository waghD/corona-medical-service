import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Shift } from 'src/app/shared/models/shift.model';
import { Observable } from 'rxjs';

@Injectable()
export class PresencePlannerService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getShifts(): Observable<Shift[]> {
    const shifts = this.apiConnection.getShifts();
    return shifts;
  }
}
