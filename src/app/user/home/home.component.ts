import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/Models/tweet';
import { User } from 'src/app/Models/user';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  tweets: Array<Tweet>;
  users: Array<User>;
  statuscode: number;

  constructor(private tweetAppService: TweetAppService) {
    
  }

  ngOnInit(): void {
    this.GetAllTweets();
    this.GetUsers();
  }

  GetAllTweets(){
    this.tweetAppService.getAllTweets().subscribe({
      next: response => {
        this.tweets = response;
        console.log('tweets retrieved');
      },
      error: (error : HttpErrorResponse) => {
        this.statuscode = error.status;
        alert(this.statuscode);
        console.log(this.statuscode);
      }
    })
  }

  GetUsers(){
    this.tweetAppService.getAllUsers().subscribe({
      next: response => {
        this.users = response;
        console.log('users retrieved');
      },
      error: (error : HttpErrorResponse) => {
        this.statuscode = error.status;
        alert(this.statuscode);
        console.log(this.statuscode);
      }
    })
  }
}
