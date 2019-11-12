import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  loggedIn: boolean;
constructor(private firebaseAuth: AngularFireAuth, private router: Router) { 
      this.user = firebaseAuth.authState;
      
  }
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('good! uid: ' + res.user.uid);
        this.loggedIn = true;
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log('Error:',err.message);
        this.loggedIn = false;
        this.router.navigate(['/login']);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.loggedIn = false;
    console.log("signed out")
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
