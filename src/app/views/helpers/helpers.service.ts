import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Helper } from 'src/app/shared/models/helper.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class HelpersService {
  private dataStream: Subject<Helper[]> = new BehaviorSubject<Helper[]>([]);

  constructor(private apiConnection: ApiConnectionService) {
    this.apiConnection
      .getHelpers()
      .subscribe((data) => this.dataStream.next(data));
  }

  public getHelpers(): Observable<Helper[]> {
    return this.dataStream.asObservable();
  }
}
