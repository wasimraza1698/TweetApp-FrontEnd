import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/Models/tweet';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  tweets: Array<Tweet>;
  message: string;

  constructor(private tweetAppService: TweetAppService) {
    
  }

  ngOnInit(): void {
    this.GetAllTweets()
  }

  GetAllTweets(){
    this.tweetAppService.getAllTweets().subscribe({
      next: response => {
        this.tweets = response;
        console.log('tweets retrieved');
      },
      error: (error : HttpErrorResponse) => {
        this.message = error.error;
        alert(this.message);
        console.log(this.message);
      }
    })
  }
}
