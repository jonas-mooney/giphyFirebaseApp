import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'giphyFirebaseApp';
  isSignedIn = false

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    if(localStorage.getItem('user')!== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
  }
  async onSignup(email: string, password: string) {
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }
  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }
  handleLogout() {
    this.isSignedIn = false
  }
  logout() {
    this.firebaseService.logout()
    // this.isLogout.emit()
  }
}
