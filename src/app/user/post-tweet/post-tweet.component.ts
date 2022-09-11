import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetRequest } from 'src/app/Models/tweet-request';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {
  tweetFormGroup : FormGroup;
  isPosted: boolean;
  message: string;
  tweetEmpty: boolean;

  constructor(private tweetAppService:TweetAppService, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.isPosted = false;
    this.tweetEmpty = false;

    this.tweetFormGroup = this.formbuilder.group({
      tweetText: ['', Validators.required],
      tweetTag: ['']
    })
  }

  get form() {
    return this.tweetFormGroup.controls;
  }

  PostTweet(){
    this.isPosted = true;

    if (this.tweetFormGroup.invalid){
      this.tweetEmpty = true;
      return;
    }
    else{
      let tweet = new TweetRequest;
      tweet.tweetText = this.tweetFormGroup.value['tweetText'];
      tweet.tweetTag = this.tweetFormGroup.value['tweetTag'];
      this.tweetAppService.postTweet(tweet).subscribe({
        next: response => {
          this.message = response;
          console.log(this.message);
          alert(this.message);
          window.location.reload();
        },
        error: (error : HttpErrorResponse) => {
          this.message = error.error;
          alert(this.message);
          console.log(this.message);
          this.Reset();
        }
      })
    }
  }

  Reset() {
    this.isPosted=false;
    this.tweetEmpty=false;
    this.tweetFormGroup.reset();
  }
}
