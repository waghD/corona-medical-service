import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Cleaner } from 'src/app/shared/models/cleaner.model';

@Injectable()
export class CleanersService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getCleaners(): Observable<Cleaner[]> {
    const cleaners = this.apiConnection.getCleaners();
    return cleaners;
  }
}

