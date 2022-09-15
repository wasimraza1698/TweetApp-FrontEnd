import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { User } from 'src/app/Models/user';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  users:Array<User>;
  tweets:Array<Tweet>;
  statuscode:number;
  username:string;

  constructor(private tweetAppService:TweetAppService, private route:ActivatedRoute,private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };

    this.route.params.subscribe(params => {
      if (params.userName){
        this.username = params.userName;
      }  
    })
   }

  ngOnInit(): void {
    this.GetUser();
    this.GetTweets()
  }

  GetUser(){
    this.tweetAppService.search(this.username).subscribe({
      next: response => {
        this.users = response;
        this.user = this.users[0];
      },
      error: (error : HttpErrorResponse) => {
        this.statuscode = error.status;
        alert(this.statuscode);
        console.log(this.statuscode);
      }
    })
  }

  GetTweets(){
    this.tweetAppService.getAllTweetsOfUser(this.username).subscribe({
      next: response => {
        this.tweets = response;
        console.log('retrieved all tweets of user');
      },
      error: (error : HttpErrorResponse) => {
        this.statuscode = error.status;
        alert(this.statuscode);
        console.log(this.statuscode);
      }
    })
  }
}
