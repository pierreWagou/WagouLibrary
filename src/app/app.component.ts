import { Component } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    const config = {
      apiKey: "AIzaSyDBPe4vHIb15bgPi-446JZ6qDCZl_8QZLo",
      authDomain: "wagoulibrary.firebaseapp.com",
      databaseURL: "https://wagoulibrary.firebaseio.com",
      projectId: "wagoulibrary",
      storageBucket: "wagoulibrary.appspot.com",
      messagingSenderId: "519822870853",
      appId: "1:519822870853:web:1d85d1d8747036af"
    }
    firebase.initializeApp(config)
  }
}
