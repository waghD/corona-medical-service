import { Component, OnInit } from '@angular/core';
import { CleanersService } from './cleaners.service';

@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.css'],
})
export class CleanersComponent implements OnInit {
  constructor(private cleanerService: CleanersService) {}

  ngOnInit(): void {}
}
