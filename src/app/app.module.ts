import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

import { TweetAppService } from './Services/tweet-app.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './login/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { HomeComponent } from './user/home/home.component';
import { PostTweetComponent } from './user/post-tweet/post-tweet.component';
import { ViewTweetComponent } from './user/view-tweet/view-tweet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewTweetsComponent } from './user/view-tweets/view-tweets.component';
import { TrendingComponent } from './user/trending/trending.component';
import { UserComponent } from './user/user/user.component';
import { SearchComponent } from './user/search/search.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NavigationComponent } from './user/navigation/navigation.component';
import { AllUsersComponent } from './user/all-users/all-users.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    PostTweetComponent,
    ViewTweetComponent,
    ViewTweetsComponent,
    TrendingComponent,
    UserComponent,
    SearchComponent,
    ProfileComponent,
    NavigationComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  providers: [TweetAppService],
  bootstrap: [AppComponent]
})

export class AppModule { }
