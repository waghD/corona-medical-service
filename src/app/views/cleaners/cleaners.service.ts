import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Cleaner } from 'src/app/shared/models/cleaner.model';

@Injectable()
export class CleanersService {
  private dataStream: Subject<Cleaner[]> = new BehaviorSubject<Cleaner[]>([]);

  constructor(private apiConnection: ApiConnectionService) {
    this.apiConnection
      .getCleaners()
      .subscribe((data) => this.dataStream.next(data));
  }

  public getCleaners(): Observable<Cleaner[]> {
    return this.dataStream.asObservable();
  }
}
