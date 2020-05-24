import { Component, OnInit } from '@angular/core';
import { HelpersService } from './helpers.service';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.css'],
})
export class HelpersComponent implements OnInit {
  constructor(private helpersService: HelpersService) {}

  ngOnInit(): void {}
}
