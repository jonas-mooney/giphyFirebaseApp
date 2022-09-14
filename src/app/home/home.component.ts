import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import axios from 'axios';
import {CommonModule} from "@angular/common";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import {user} from "@angular/fire/auth";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  url = `https://api.giphy.com/v1/gifs/trending?api_key=KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz&limit=30`;
  gifs = [];
  @Output() isLogout = new EventEmitter<void>()

  private userRef: AngularFirestoreDocument;
  user = localStorage.getItem('user')
  userParsed = JSON.parse(this.user)

  constructor(
    private firebaseService: FirebaseService,
    private db: AngularFirestore) {
      this.userRef = this.db.doc(`users/${this.userParsed.uid}`)
    }

  ngOnInit(): void {
    axios
      .get('https://api.giphy.com/v1/gifs/trending?api_key=KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz&limit=30\n')
      .then(response => this.gifs = response.data.data)
      console.log(this.gifs)
  }

  logout() {
    this.firebaseService.logout()
    this.isLogout.emit()
  }

  addToFavs(favedGif) {
    this.userRef.set({favedGif: 'asdf'})
    console.log(this.userParsed.uid)
  }

  retrieveFavs() {
    const gifData = this.db.doc(`users/${this.userParsed.uid}`).get();
    console.log(gifData)
  }

}

