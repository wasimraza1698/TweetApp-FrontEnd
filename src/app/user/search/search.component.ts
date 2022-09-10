import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetAppService } from 'src/app/Services/tweet-app.service';
import { User } from 'src/app/Models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users:Array<User>;
  message:string;

  constructor(private tweetAppService:TweetAppService, private route: Router) { }

  ngOnInit(): void {
    this.users = [];
  }

  Search(key:HTMLInputElement) {
    if (key.value.length > 2){
      this.tweetAppService.search(key.value).subscribe({
        next: response => {
          this.users = response;
        },
        error: (error: HttpErrorResponse) => {
          this.message = error.error;
          console.log(this.message);
        }
      })
    }
    else {
      this.users = [];
    }
  }

}
