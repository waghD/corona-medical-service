import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Shift } from 'src/app/shared/models/shift.model';

@Injectable()
export class PresencePlannerService {
  constructor(private apiConnection: ApiConnectionService) {
    this.test()
      .then(() => console.log('test successfull'))
      .catch((err) => {
        console.log('Test errorfull: ');
        console.error(err);
      });
  }

  private async test() {
    const shifts = await this.apiConnection.getShifts().toPromise();
    console.log('Shifts: ', shifts);
    const updateShift = shifts[2];
    updateShift.from = new Date();
    const updateRes = await this.apiConnection
      .editShift(updateShift.id, updateShift)
      .toPromise();
    console.log('Updated Shift: ', updateRes);
    const doctors = await this.apiConnection.getDoctors().toPromise();
    const stations = await this.apiConnection.getStations().toPromise();
    const helpers = await this.apiConnection.getHelpers().toPromise();
    const cleaners = await this.apiConnection.getCleaners().toPromise();
    const newShift = new Shift({
      id: -1,
      from: new Date(2020, 5, 30, 6).toISOString(),
      to: new Date(2020, 5, 31, 6).toISOString(),
      cleaner: cleaners[0],
      doc: doctors[0],
      helper: helpers[0],
      station: stations[0],
    });
    const createRes = await this.apiConnection
      .createShift(newShift)
      .toPromise();
    console.log('Created Shift: ', createRes);

    const shiftsAgain = await this.apiConnection.getShifts().toPromise();
    console.log('Shifts after tests: ', shiftsAgain);
  }
}
