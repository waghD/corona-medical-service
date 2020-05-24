import { Doctor } from '../doctors/doctor.dto';
import { Helper } from '../helpers/helper.dto';
import { Cleaner } from '../cleaners/cleaner.dto';
import { Station } from '../stations/station.dto';

export class Shift {
  id: number;
  from: string;
  to: string;
  doc: Doctor;
  helper: Helper;
  cleaner: Cleaner;
  station: Station;
}
