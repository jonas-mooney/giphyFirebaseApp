import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire/compat";
import { HomeComponent } from './home/home.component';
import {FirebaseService} from "./services/firebase.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { SearchComponent } from './search/search.component';
import {CommonModule} from "@angular/common";
import { FavoritesComponent } from './favorites/favorites.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LoginComponent } from './login/login.component';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FavoritesComponent,
    TopNavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCTxRWBlzqpmpWxMIrteN0EFQHMQatvrQQ",
      authDomain: "giphy-firebase-angular.firebaseapp.com",
      projectId: "giphy-firebase-angular",
      storageBucket: "giphy-firebase-angular.appspot.com",
      messagingSenderId: "33101728903",
      appId: "1:33101728903:web:f92c165caf748ca6877c22"
    }),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
