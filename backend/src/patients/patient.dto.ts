import { Station } from '../stations/station.dto';

export class Patient {
  id: number;
  name: string;
  surname: string;
  station: Station;
}
