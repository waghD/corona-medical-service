import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';

@Injectable()
export class HomeService {
  constructor(private apiConnection: ApiConnectionService) {}

  getDoctors() {
    return this.apiConnection.getDoctors();
  }
}
