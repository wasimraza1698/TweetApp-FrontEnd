import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component'; 
import { LoginComponent } from './login/login.component';
import { ViewTweetComponent } from './user/view-tweet/view-tweet.component';
import { ProfileComponent } from './user/profile/profile.component';
import { TweetAppGuard } from './Guards/tweet-app.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate:[TweetAppGuard] },
    { path: 'view-tweet/:tweetId', component: ViewTweetComponent, canActivate:[TweetAppGuard] },
    { path: 'profile/:userName', component: ProfileComponent, canActivate:[TweetAppGuard]},
    { path:'', redirectTo:'login', pathMatch:'full' }
  ];
  
  @NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule],
    exports: [
        RouterModule
    ]
  })

  export class AppRoutingModule { }
  