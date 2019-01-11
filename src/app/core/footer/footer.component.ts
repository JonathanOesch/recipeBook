import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  appVersion: number;
  lastUpdated: string;

  constructor() { }

  ngOnInit() {
    this.appVersion = 1.2;
    this.lastUpdated = "1/10/2019";
  }

}
