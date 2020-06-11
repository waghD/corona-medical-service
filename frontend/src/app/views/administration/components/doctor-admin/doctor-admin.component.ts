import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css'],
})
export class DoctorAdminComponent implements OnInit {
  constructor(private adminService: AdministrationService) {}

  ngOnInit(): void {}
}
