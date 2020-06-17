import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Observable } from 'rxjs';

@Injectable()
export class DoctorsService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getDocs(): Observable<Doctor[]> {
    return this.apiConnection.getDoctors();
  }
}
