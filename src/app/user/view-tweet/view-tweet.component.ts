import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { TweetRequest } from 'src/app/Models/tweet-request';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-view-tweet',
  templateUrl: './view-tweet.component.html',
  styleUrls: ['./view-tweet.component.css']
})
export class ViewTweetComponent implements OnInit {
  tweetId:string;
  tweet:Tweet;
  editTweet: boolean;
  deleteTweet: boolean;
  editFormGroup:FormGroup;
  isEdited:boolean;
  tweetEmpty:boolean;
  message:string;

  constructor(private tweetAppService: TweetAppService, private route: ActivatedRoute, private router:Router, private formBuilder:FormBuilder) {
    this.route.params.subscribe(params =>{
      if (params.tweetId){
        this.tweetId = params.tweetId;
      }
    });
   }

  ngOnInit(): void {
    this.GetTweet(this.tweetId);

    this.editFormGroup = this.formBuilder.group({
      tweetText : ['',Validators.required],
      tweetTag : ['']
    })
  }
  
  SetToEditMode(){
      this.editFormGroup = this.formBuilder.group({
        tweetText: [this.tweet.tweetText, Validators.required],
        tweetTag: [this.tweet.tweetTag]
      });

      this.editTweet = true;
  }

  ShowEditAndDelete(username:string){
    let user = localStorage.getItem('username');
    if (user != null){
      return user == username;
    }

    return false;
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
          this.tweet = response;
          this.editTweet = false;
          alert("tweet updated");
        },
        error: (error : HttpErrorResponse) => {
          this.message = error.error;
          alert(this.message);
          console.log(this.message);
        }
      })
    }
  }

  DeleteTweet(tweetId:string)
  {
    this.tweetAppService.delete(tweetId).subscribe({
      next : response => {
        this.deleteTweet = false;
        this.router.navigateByUrl('home');
        this.message = response;
        console.log(this.message);
        alert(this.message);
      },
      error: (error : HttpErrorResponse) => {
        this.message = error.error;
        alert(this.message);
        console.log(this.message);
      }
    })
  }

  GetTweet(tweetId:string){
    this.tweetAppService.getTweet(tweetId).subscribe({
      next: response => {
        this.tweet = response;
      },
      error: (error : HttpErrorResponse) => {
        this.message = error.error;
        alert(this.message);
        console.log(this.message);
      }
    })
  }

  GoToProfile(username:string){
    this.router.navigateByUrl('profile/'+username);
  }

  get form() {
    return this.editFormGroup.controls;
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
