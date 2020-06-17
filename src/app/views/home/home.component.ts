import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {}

  getDoctors() {
    this.homeService.getDoctors().subscribe(
      (data) => console.log(data),
      (error) => console.error(error),
      () => console.log('completed')
    );
  }
}
