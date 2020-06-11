import { Component, OnInit } from '@angular/core';
import { AdministrationService } from './administration.service';

enum AdminComponentTypes {
  DOCTOR,
  HELPER,
  CLEANER,
  PATIENT,
}

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent implements OnInit {
  displayComponent: AdminComponentTypes = AdminComponentTypes.DOCTOR;

  // Hack um Enum in HTML Template zu verwenden
  adminComponentTypes = AdminComponentTypes;

  constructor(private adminService: AdministrationService) {}

  ngOnInit(): void {}
}
