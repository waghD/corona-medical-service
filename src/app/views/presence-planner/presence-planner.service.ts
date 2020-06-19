import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Shift } from 'src/app/shared/models/shift.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class PresencePlannerService {
  private shiftStream: Subject<Shift[]> = new BehaviorSubject<Shift[]>([]);

  constructor(private apiConnection: ApiConnectionService) {
    this.apiConnection
      .getShifts()
      .subscribe((shifts) => this.shiftStream.next(shifts));
  }

  public getShifts(): Observable<Shift[]> {
    return this.shiftStream.asObservable();
  }
}
