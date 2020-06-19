import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Doctor } from 'src/app/shared/models/doctor.model';

@Injectable()
export class HomeService {
  private dataStream: Subject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);

  constructor(private apiConnection: ApiConnectionService) {
    this.apiConnection
      .getDoctors()
      .subscribe((data) => this.dataStream.next(data));
  }

  getDoctors(): Observable<Doctor[]> {
    return this.dataStream.asObservable();
  }
}
