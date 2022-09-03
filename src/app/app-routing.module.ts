import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './login/register/register.component';
import { HomeComponent } from './user/home/home.component'; 
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { PostTweetComponent } from './user/post-tweet/post-tweet.component';
import { ViewTweetComponent } from './user/view-tweet/view-tweet.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'view-tweet', component: ViewTweetComponent },
    { path: 'post-tweet', component: PostTweetComponent },
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
  