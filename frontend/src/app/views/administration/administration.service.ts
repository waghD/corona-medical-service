import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Shift } from 'src/app/shared/models/shift.model';

@Injectable()
export class AdministrationService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getShifts(): Observable<Doctor[]> {
    const doctors = this.apiConnection.getDoctors();
    return doctors;
  }

  public deleteDoc(id: number) {
    return this.apiConnection.deleteDoctor(id);
  }

  public editDoc(id: number, doc: Doctor) {
    return this.apiConnection.editDoctor(id, {
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
  }

  public createDoc(doc: Doctor) {
    const newDoc = new Doctor({
      id: 9,
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
    return this.apiConnection.createDoctor(newDoc);
  }

  public createShift(shift: Shift) {
    const newShift = new Shift({
      id: -1,
      from: shift.from.toISOString(),
      to: shift.from.toISOString(),

      cleaner: null,
      // hier steh ich jetzt leider an, ich versteh nicht warum hier doc nicht passt..
      // eigentlich sollten hier null eingaben funktionieren
      // zur Vereinfachung der Aufgabe würde ich vorschlagen, dass wir:
      //- nur Tageweise Schichten machen
      //- Schichten lassen sich nur erstellen, aber nicht löschen
      // dann sollte die Aufgabe bis Sonntag aufjedenfall schaffbar sein...
      doc: shift.doc,
      helper: null,
      station: null,
    });
    return this.apiConnection.createShift(newShift);
  }
}
