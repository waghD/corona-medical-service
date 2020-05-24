import { Component, OnInit } from '@angular/core';
import { AdministrationService } from './administration.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent implements OnInit {
  constructor(private adminService: AdministrationService) {}

  ngOnInit(): void {}
}
