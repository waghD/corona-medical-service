import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DoctorsService {
  private dataStream: Subject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);

  constructor(private apiConnection: ApiConnectionService) {
    this.apiConnection
      .getDoctors()
      .subscribe((data) => this.dataStream.next(data));
  }

  public getDocs(): Observable<Doctor[]> {
    return this.dataStream.asObservable();
  }
}
