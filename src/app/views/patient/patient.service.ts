import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient.model';

@Injectable()
export class PatientService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getPatients(): Observable<Patient[]> {
    return this.apiConnection.getPatients();
  }
}
