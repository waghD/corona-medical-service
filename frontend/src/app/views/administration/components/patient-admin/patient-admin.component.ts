import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-patient-admin',
  templateUrl: './patient-admin.component.html',
  styleUrls: ['./patient-admin.component.css'],
})
export class PatientAdminComponent implements OnInit {
  constructor(private adminService: AdministrationService) {}

  ngOnInit(): void {}
}
