import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient.model';

@Injectable()
export class PatientService {
  private dataStream: Subject<Patient[]> = new BehaviorSubject<Patient[]>([]);

  constructor(private apiConnection: ApiConnectionService) {
    this.apiConnection
      .getPatients()
      .subscribe((data) => this.dataStream.next(data));
  }

  public getPatients(): Observable<Patient[]> {
    return this.dataStream.asObservable();
  }
}
