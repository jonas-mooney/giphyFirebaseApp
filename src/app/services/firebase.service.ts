import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  isLoggedIn = false
  constructor(public firebaseAuth : AngularFireAuth, private router: Router) { }
  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res=>{
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate(['/trending']);
      })
  }
  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res=>{
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
}
