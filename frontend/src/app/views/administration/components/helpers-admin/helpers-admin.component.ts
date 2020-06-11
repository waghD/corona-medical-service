import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-helpers-admin',
  templateUrl: './helpers-admin.component.html',
  styleUrls: ['./helpers-admin.component.css'],
})
export class HelpersAdminComponent implements OnInit {
  constructor(private adminService: AdministrationService) {}

  ngOnInit(): void {}
}
