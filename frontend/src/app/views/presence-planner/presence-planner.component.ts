import { Component, OnInit } from '@angular/core';
import { PresencePlannerService } from './presence-planner.service';

@Component({
  selector: 'app-presence-planner',
  templateUrl: './presence-planner.component.html',
  styleUrls: ['./presence-planner.component.css'],
})
export class PresencePlannerComponent implements OnInit {
  constructor(private precenseService: PresencePlannerService) {}

  ngOnInit(): void {}
}
