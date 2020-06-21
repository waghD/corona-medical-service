import { Station } from 'src/app/shared/models/station.model';

export enum OperationTypes {
  CREATE,
  UPDATE,
  DELETE,
  ADD,
  CANCEL,
}

export interface DialogData<T> {
  action: OperationTypes;
  data?: T;
}
