import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-cleaners-admin',
  templateUrl: './cleaners-admin.component.html',
  styleUrls: ['./cleaners-admin.component.css'],
})
export class CleanersAdminComponent implements OnInit {
  constructor(private adminService: AdministrationService) {}

  ngOnInit(): void {}
}
