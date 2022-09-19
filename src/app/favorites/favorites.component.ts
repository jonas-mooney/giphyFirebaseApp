import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import axios from 'axios';
import {CommonModule} from "@angular/common";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  url = `https://api.giphy.com/v1/gifs/trending?api_key=KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz&limit=30`;
  gifs = [];
  favedGifs = [];
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
    localStorage.setItem('onLoginPage', JSON.stringify(false))

    this.db
      .collection('users')
      .doc(this.userParsed.uid)
      .valueChanges()
      .subscribe((res: any) => {
        this.favedGifs = res.favedGifs
      })
  }

  removeFromFavs(gif) {
    let index = this.favedGifs.indexOf(gif)
    this.favedGifs.splice(index, 1)
    this.userRef.set({favedGifs: this.favedGifs})
    // console.log('gif to be removed' + ' ' + gif)
  }

}
