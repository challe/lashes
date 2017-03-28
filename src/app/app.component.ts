import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeLink: number;
  constructor() {}

  toggleActive(active: number) {
    this.activeLink = active;
  }
}
