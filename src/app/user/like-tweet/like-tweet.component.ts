import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/Models/tweet';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-like-tweet',
  templateUrl: './like-tweet.component.html',
  styleUrls: ['./like-tweet.component.css']
})
export class LikeTweetComponent implements OnInit {
  @Input() tweetId:string;
  @Input() likesCount:number;
  @Input() tweetLikedBy:Array<string>;
  tweetLiked:boolean;
  username:string;
  tweet:Tweet;
  statuscode:number;

  constructor(private tweetAppService: TweetAppService) { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    if (username != null){
      this.username = username;
    }
    this.tweetLiked = this.tweetLikedBy.includes(this.username);
  }

  LikeTweet(tweetId: string){
    this.tweetAppService.like(tweetId).subscribe({
      next: response => {
        this.tweet = response;
        this.likesCount = this.tweet.tweetLikesCount;
        this.tweetLikedBy = this.tweet.tweetLikedBy;
        this.tweetLiked = this.tweetLikedBy.includes(this.username);
      },
      error: (error : HttpErrorResponse) => {
        this.statuscode = error.status;
        alert(this.statuscode);
        console.log(this.statuscode);
      }
    })
  }
}
