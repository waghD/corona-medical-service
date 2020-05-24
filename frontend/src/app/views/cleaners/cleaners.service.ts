import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';

@Injectable()
export class CleanersService {
  constructor(private apiConnection: ApiConnectionService) {}
}
