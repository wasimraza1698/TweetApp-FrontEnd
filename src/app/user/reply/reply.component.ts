import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplyRequest } from 'src/app/Models/reply-request';
import { Tweet } from 'src/app/Models/tweet';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() tweetId: string;
  @Input() repliesCount: number;
  datatarget:string;
  replyFormGroup: FormGroup;
  replied: boolean;
  replyEmpty:boolean;
  message:string;
  hidden:boolean;

  constructor(private formBuilder:FormBuilder, private tweetAppService: TweetAppService) { }

  ngOnInit(): void {
    this.replyFormGroup = this.formBuilder.group({
      replyText : ['', Validators.required],
      replyTag: ['']
    });

    this.datatarget = "#" + this.tweetId;

    this.replied = false;
    this.replyEmpty = false;
  }

  ReplyToTweet(tweetId:string){
    this.replied = true;

    if (this.replyFormGroup.invalid){
      this.replyEmpty = true;
    }
    else{
      this.hidden = true;
      let reply = new ReplyRequest();
      reply.replyText = this.replyFormGroup.value['replyText'];
      reply.replyTag = this.replyFormGroup.value['replyTag'];
      this.tweetAppService.reply(tweetId, reply).subscribe({
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

  get form() {
    return this.replyFormGroup.controls;
  }

  Reset() {
    this.replied=false;
    this.replyEmpty=false;
    this.replyFormGroup.reset();
  }
}
