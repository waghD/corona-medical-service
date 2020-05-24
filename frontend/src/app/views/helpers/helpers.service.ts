import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';

@Injectable()
export class HelpersService {
  constructor(private apiConnection: ApiConnectionService) {}
}
