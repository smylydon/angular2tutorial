import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
  userLoggedIn: boolean = false;
  loggedInUser: string;
  authUser: any;

  constructor(private router: Router) {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDgom1EG7pJUMxhYPCaxJktu5xz_HI7vwI",
      authDomain: "gigabytegames-88b3b.firebaseapp.com",
      databaseURL: "https://gigabytegames-88b3b.firebaseio.com",
      projectId: "gigabytegames-88b3b",
      storageBucket: "gigabytegames-88b3b.appspot.com",
      messagingSenderId: "614928139262"
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url: string):boolean {
    let result:boolean = false;
    if (this.userLoggedIn) {
      result = true;
    } else {
      this.router.navigate(['/admin/login']);
    }
    return result;
  }

  verifyUser() {
    this.authUser = firebase.auth().currentUser;

    if (this.authUser) {
      alert(`Welcome ${this.authUser.email}`);

      this.loggedInUser = this.authUser.email;
      this.userLoggedIn = true;
      this.router.navigate(['/admin']);
    }
  }

  register(email:string, password:string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        alert(`${error.message} Please try again.`);
      });
  }

  login(email:string, password:string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        alert(`${error.message} Unable to login. Please try again.`);
      });
  }

  logout() {
    this.userLoggedIn = false;
    firebase.auth().signOut()
      .then(function () {
        alert('You are logged out');
      })
      .catch(function (error) {
        alert(`${error.message} Unable to logout. Please try again.`);
      });
  }
}
