import { Doctor } from 'src/api/doctors/doctor.dto';
import { Helper } from 'src/api/helpers/helper.dto';
import { Patient } from 'src/api/patients/patient.dto';
import { Station } from 'src/api/stations/station.dto';
import { Cleaner } from 'src/api/cleaners/cleaner.dto';
import { Shift } from 'src/api/shifts/shift.dto';

export const generateDoctors = (): Doctor[] => {
  const doctors: Doctor[] = [];

  const doc1 = new Doctor();
  doc1.name = 'Andre';
  doc1.surname = 'Strasser';
  doc1.profession = 'Interne';
  doctors.push(doc1);

  const doc2 = new Doctor();
  doc2.name = 'Eggert';
  doc2.surname = 'Honigsmann';
  doc2.profession = 'Chirugie';
  doctors.push(doc2);

  const doc3 = new Doctor();
  doc3.name = 'Torsten';
  doc3.surname = 'Schiffner';
  doc3.profession = 'Chirugie';
  doctors.push(doc3);

  const doc4 = new Doctor();
  doc4.name = 'Albrecht';
  doc4.surname = 'Rahmer';
  doc4.profession = 'Interne';
  doctors.push(doc4);

  const doc5 = new Doctor();
  doc5.name = 'Josef';
  doc5.surname = 'Bruckner';
  doc5.profession = 'Chirurgie';
  doctors.push(doc5);

  return doctors;
};

export const generateHelpers = (): Helper[] => {
  const helpers: Helper[] = [];

  const help1 = new Helper();
  help1.name = 'Berthold';
  help1.surname = 'Wassermann';
  helpers.push(help1);

  const help2 = new Helper();
  help2.name = 'Manuel';
  help2.surname = 'Welser';
  helpers.push(help2);

  const help3 = new Helper();
  help3.name = 'Michael';
  help3.surname = 'Semmler';
  helpers.push(help3);

  const help4 = new Helper();
  help4.name = 'Stefan';
  help4.surname = 'Steinitz';
  helpers.push(help4);

  return helpers;
};

export const generateCleaners = (): Cleaner[] => {
  const cleaners: Cleaner[] = [];

  const clean1 = new Cleaner();
  clean1.name = 'Genoveva';
  clean1.surname = 'Dorfmann';
  cleaners.push(clean1);

  const clean2 = new Cleaner();
  clean2.name = 'Ursel';
  clean2.surname = 'Hornbostel';
  cleaners.push(clean2);

  const clean3 = new Cleaner();
  clean3.name = 'Berndt';
  clean3.surname = 'Rutter';
  cleaners.push(clean3);

  return cleaners;
};

export const generateStations = (): Station[] => {
  const stations: Station[] = [];

  const stat1 = new Station();
  stat1.station = 'Interne';
  stations.push(stat1);

  const stat2 = new Station();
  stat2.station = 'Intensivstation';
  stations.push(stat2);

  const stat3 = new Station();
  stat3.station = 'Palliativstation';
  stations.push(stat3);

  return stations;
};

export const generatePatients = (stations: Station[]): Patient[] => {
  const patients: Patient[] = [];

  const pat1 = new Patient();
  pat1.name = 'Anton';
  pat1.surname = 'Huber';
  pat1.station = stations.find(station => station.id === 1);
  patients.push(pat1);

  const pat2 = new Patient();
  pat2.name = 'Leni';
  pat2.surname = 'Strobl';
  pat2.station = stations.find(station => station.id === 3);
  patients.push(pat2);

  const pat3 = new Patient();
  pat3.name = 'Teresa';
  pat3.surname = 'Scherer';
  pat3.station = stations.find(station => station.id === 1);
  patients.push(pat3);

  const pat4 = new Patient();
  pat4.name = 'Tilmann';
  pat4.surname = 'Niekisch';
  pat4.station = stations.find(station => station.id === 1);
  patients.push(pat4);

  const pat5 = new Patient();
  pat5.name = 'Hildebrand';
  pat5.surname = 'Seiler';
  pat5.station = stations.find(station => station.id === 2);
  patients.push(pat5);

  return patients;
};

export const generateShifts = (
  doctors: Doctor[],
  helpers: Helper[],
  cleaners: Cleaner[],
  stations: Station[],
): Shift[] => {
  const shifts: Shift[] = [];

  const shift1 = new Shift();
  shift1.from = new Date(2020, 3, 14, 6);
  shift1.to = new Date(2020, 3, 15, 6);
  shift1.doc = doctors.find(doc => doc.id === 1);
  shift1.helper = helpers.find(hel => hel.id === 0);
  shift1.cleaner = cleaners.find(clean => clean.id === 0);
  shift1.station = stations.find(station => station.id === 1);
  shifts.push(shift1);

  const shift2 = new Shift();
  shift2.from = new Date(2020, 3, 14, 6);
  shift2.to = new Date(2020, 3, 14, 15);
  shift2.doc = doctors.find(doc => doc.id === 0);
  shift2.helper = helpers.find(hel => hel.id === 1);
  shift2.cleaner = cleaners.find(clean => clean.id === 0);
  shift2.station = stations.find(station => station.id === 1);
  shifts.push(shift2);

  const shift3 = new Shift();
  shift3.from = new Date(2020, 3, 14, 15);
  shift3.to = new Date(2020, 3, 15, 6);
  shift3.doc = doctors.find(doc => doc.id === 0);
  shift3.helper = helpers.find(hel => hel.id === 0);
  shift3.cleaner = cleaners.find(clean => clean.id === 1);
  shift3.station = stations.find(station => station.id === 0);
  shifts.push(shift3);

  const shift4 = new Shift();
  shift4.from = new Date(2020, 3, 16, 6);
  shift4.to = new Date(2020, 3, 17, 6);
  shift4.doc = doctors.find(doc => doc.id === 2);
  shift4.helper = helpers.find(hel => hel.id === 0);
  shift4.cleaner = cleaners.find(clean => clean.id === 0);
  shift4.station = stations.find(station => station.id === 2);
  shifts.push(shift4);

  const shift5 = new Shift();
  shift5.from = new Date(2020, 3, 17, 6);
  shift5.to = new Date(2020, 3, 18, 6);
  shift5.doc = doctors.find(doc => doc.id === 1);
  shift5.helper = helpers.find(hel => hel.id === 0);
  shift5.cleaner = cleaners.find(clean => clean.id === 0);
  shift5.station = stations.find(station => station.id === 2);
  shifts.push(shift5);

  const shift6 = new Shift();
  shift6.from = new Date(2020, 3, 17, 6, 15);
  shift6.to = new Date(2020, 3, 18, 3);
  shift6.doc = doctors.find(doc => doc.id === 3);
  shift6.helper = helpers.find(hel => hel.id === 0);
  shift6.cleaner = cleaners.find(clean => clean.id === 0);
  shift6.station = stations.find(station => station.id === 2);
  shifts.push(shift6);

  const shift7 = new Shift();
  shift7.from = new Date(2020, 3, 17, 15);
  shift7.to = new Date(2020, 3, 18, 3);
  shift7.doc = doctors.find(doc => doc.id === 5);
  shift7.helper = helpers.find(hel => hel.id === 0);
  shift7.cleaner = cleaners.find(clean => clean.id === 0);
  shift7.station = stations.find(station => station.id === 2);
  shifts.push(shift7);

  const shift8 = new Shift();
  shift8.from = new Date(2020, 3, 17, 6);
  shift8.to = new Date(2020, 3, 18, 6);
  shift8.doc = doctors.find(doc => doc.id === 2);
  shift8.helper = helpers.find(hel => hel.id === 0);
  shift8.cleaner = cleaners.find(clean => clean.id === 0);
  shift8.station = stations.find(station => station.id === 2);
  shifts.push(shift8);

  const shift9 = new Shift();
  shift9.from = new Date(2020, 3, 17, 6);
  shift9.to = new Date(2020, 3, 18, 6);
  shift9.doc = doctors.find(doc => doc.id === 1);
  shift9.helper = helpers.find(hel => hel.id === 0);
  shift9.cleaner = cleaners.find(clean => clean.id === 0);
  shift9.station = stations.find(station => station.id === 2);
  shifts.push(shift9);

  return shifts;
};
