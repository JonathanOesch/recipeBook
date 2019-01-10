import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { MessagesService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(
    private router: Router, 
    private location: Location,
    private messagesService: MessagesService) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => {
          console.log(error);
        }
      )
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.location.back();
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
          this.messagesService.addNotification( 'success', 'Login', 'Login successful' );
        }
      )
      .catch(
        error => {
          console.log(error);
          this.messagesService.addNotification( 'error', 'Login', 'Login failed' );
        }
      )
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
    this.messagesService.addNotification( 'success', 'Logout', 'Logout successful' );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
