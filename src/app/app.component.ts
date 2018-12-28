import { Component, OnInit, AfterContentInit } from '@angular/core';

import * as firebase from 'firebase';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'Recipes';
  loadedFeature = 'recipe';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCh9A0zrBPvAOVGyx_88-kZFBXHj-NoQfw",
      authDomain: "ng-recipe-book-ee76c.firebaseapp.com"
    });
  }

  ngAfterContentInit() {
    console.log('AfterContentInit ran ...');
    this.messageService.add( { severity: 'success', summary: 'Test Toast', detail: 'Test' } );
    console.log(this.messageService);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
