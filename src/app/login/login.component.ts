import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {AuthService} from "../services/google-auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'giphyFirebaseApp';
  isSignedIn = false

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService, public authService: AuthService, public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    localStorage.setItem('onLoginPage', JSON.stringify(true))
    if(localStorage.getItem('user')!== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
  }
  async onSignup(email: string, password: string) {
    await this.firebaseService.signup(email,password)
    window.location.reload()
    if(this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }
  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }
  async onGoogleSignIn() {
    await this.authService.GoogleAuth()
    window.location.reload()
    this.isSignedIn = true
  }

  handleLogout() {
    this.isSignedIn = false
  }
  logout() {
    this.firebaseService.logout()
  }
}
