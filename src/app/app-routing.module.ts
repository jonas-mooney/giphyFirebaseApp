import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SearchComponent} from "./search/search.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  // { path: '', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: '', component: LoginComponent },
  { path: 'trending', component: HomeComponent},
  {
    path: 'search',
    component: SearchComponent,
  },
  { path: 'favorites',
    component: FavoritesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
