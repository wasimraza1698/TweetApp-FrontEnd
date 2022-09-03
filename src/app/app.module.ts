import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';

import { TweetAppService } from './Services/tweet-app.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './login/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { HomeComponent } from './user/home/home.component';
import { PostTweetComponent } from './user/post-tweet/post-tweet.component';
import { ViewTweetComponent } from './user/view-tweet/view-tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    PostTweetComponent,
    ViewTweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TweetAppService],
  bootstrap: [AppComponent]
})

export class AppModule { }
