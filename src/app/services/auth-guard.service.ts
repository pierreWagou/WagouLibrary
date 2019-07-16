import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import * as firebase from 'firebase/app'
import {Observable} from 'rxjs'

@Injectable()

export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          resolve(true)
        }
        else {
          this.router.navigate(["/auth", "signin"])
          resolve(false)
        }
      })
    })
  }

}
