import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { TweetRequest } from 'src/app/Models/tweet-request';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-view-tweets',
  templateUrl: './view-tweets.component.html',
  styleUrls: ['./view-tweets.component.css']
})
export class ViewTweetsComponent implements OnInit {
  @Input() tweets: Array<Tweet>;
  editTweet: Array<string>;
  deleteTweet: Array<string>;
  editFormGroup:FormGroup;
  isEdited:boolean;
  tweetEmpty:boolean;
  message:string;
  statuscode : number;

  constructor(private router:Router, private formBuilder:FormBuilder, private tweetAppService:TweetAppService) { }

  ngOnInit(): void {
    this.editFormGroup = this.formBuilder.group({
      tweetText: ['', Validators.required],
      tweetTag: ['']
    });

    this.editTweet = [];
    this.deleteTweet = [];
  }

  IsInEditMode(tweetId:string){
    return this.editTweet.includes(tweetId);
  }

  ShowEditAndDelete(username:string){
    let user = localStorage.getItem('username');
    if (user != null){
      return user == username;
    }

    return false;
  }

  SetToEditMode(tweetId:string, tweetText:string, tweetTag:string){
    if (this.editTweet.length < 1){
      this.editFormGroup = this.formBuilder.group({
        tweetText: [tweetText, Validators.required],
        tweetTag: [tweetTag]
      });

      this.editTweet.push(tweetId);
    }
  }

  RemoveFromEditMode(tweetId:string){
    let index = this.editTweet.indexOf(tweetId);
    if (index !== -1){
      this.editTweet.splice(index, 1);
    }
  }

  SetToDeleteMode(tweetId:string){
    if (this.deleteTweet.length < 1){
      this.deleteTweet.push(tweetId);
    }
  }

  RemoveFromDeleteMode(tweetId:string){
    let index = this.deleteTweet.indexOf(tweetId);
    if (index !== -1){
      this.deleteTweet.splice(index, 1);
    }
  }

  IsInDeleteMode(tweetId:string){
    return this.deleteTweet.includes(tweetId);
  }

  get form() {
    return this.editFormGroup.controls;
  }

  EditTweet(tweetId:string){
    this.isEdited = true;
    if (this.editFormGroup.invalid){
      this.tweetEmpty = true;
      return;
    }
    else{
      let tweet = new TweetRequest;
      tweet.tweetText = this.editFormGroup.value['tweetText'];
      tweet.tweetTag = this.editFormGroup.value['tweetTag'];
      this.tweetAppService.edit(tweetId, tweet).subscribe({
        next: response => {
          let index = this.tweets.findIndex(t => t.tweetId == tweetId);
          if (index !== -1){
            this.tweets[index] = response;
            this.RemoveFromEditMode(tweetId);
            alert("tweet updated");
          }
        },
        error: (error : HttpErrorResponse) => {
          this.statuscode = error.status;
          alert(this.statuscode);
          console.log(this.statuscode);
        }
      })
    }
  }

  DeleteTweet(tweetId:string)
  {
    this.tweetAppService.delete(tweetId).subscribe({
      next : response => {
        this.RemoveFromDeleteMode(tweetId);
        let index = this.tweets.findIndex(t => t.tweetId == tweetId);
          if (index !== -1){
            this.tweets.splice(index, 1);
          }
        this.message = response;
        console.log(this.message);
        alert(this.message);
      },
      error: (error : HttpErrorResponse) => {
        this.statuscode = error.status;
        alert(this.statuscode);
        console.log(this.statuscode);
      }
    })
  }

  GoToProfile(username:string){
    this.router.navigateByUrl('profile/'+username);
  }

  GoToTweet(tweetId:string){
    this.router.navigateByUrl('view-tweet/'+tweetId);
  }
  
  ConvertTime(time: Date){
    time = time
    let timeInString = time.toString()
    var date = new Date((timeInString || "").replace(/-/g,"/").replace(/[TZ]/g," ").concat(" UTC")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
      return date.toString().substring(0, 15);
        
    return day_diff == 0 && (
        diff < 60 && "just now" ||
        diff < 120 && "1m" ||
        diff < 3600 && Math.floor( diff / 60 ) + "m" ||
        diff < 7200 && "1h" ||
        diff < 86400 && Math.floor( diff / 3600 ) + "h") ||
        day_diff == 1 && "yesterday" ||
        day_diff < 7 && day_diff + "d" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + "w"; 
  }
}
