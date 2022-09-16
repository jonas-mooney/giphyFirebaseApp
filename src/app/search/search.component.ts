import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedGifs = [];
  favedGifs = [];

  private userRef: AngularFirestoreDocument;
  user = localStorage.getItem('user')
  userParsed = JSON.parse(this.user)

  constructor(
    private firebaseService: FirebaseService,
    private db: AngularFirestore) {
    this.userRef = this.db.doc(`users/${this.userParsed.uid}`)
  }

  ngOnInit(): void {
    this.db
      .collection('users')
      .doc(this.userParsed.uid)
      .valueChanges()
      .subscribe((res: any) => {
        this.favedGifs = res.favedGifs
      })
  }

  apiCall(searchInput) {
      axios
      // .get(`https://api.giphy.com/v1/gifs&api_key=KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz&limit=30&q=${searchInput}&rating=g\n`)
        .get(`https://api.giphy.com/v1/gifs/search?api_key=KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz&limit=30&q=${searchInput}&rating=pg`)
      .then(response => this.searchedGifs = response.data.data)
        console.log(this.searchedGifs)
  }

  addToFavs(favedGif) {
    this.favedGifs.push(favedGif)
    this.userRef.set({favedGifs: this.favedGifs})
  }

}
