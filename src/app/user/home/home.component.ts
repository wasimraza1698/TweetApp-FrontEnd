import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';
import { User } from 'src/app/Models/user';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: User;
  form: FormGroup;
  id: number;
  tweet: Tweet;
  username: string;
  clickedMoreButton: { [key: number]: boolean } = {};
  submitted = false;
  message: string;
  list: User[];
  count: number;
  uname: string;
  width: any;
  displayFullProfile : boolean;

  constructor(private formbuilder: FormBuilder, private tweetAppService: TweetAppService, private route: Router) {
    this.Profiles();
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    if (this.width <= 1450) {
      this.displayFullProfile = false;
    }
    else {
      this.displayFullProfile = true;
    }

    this.form = this.formbuilder.group({
      username: ['']
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth;
    if (this.width <= 1450) {
      this.displayFullProfile = false;
    }
    else {
      this.displayFullProfile = true;
    }
  }

  Profiles() {
    this.username = String(localStorage.getItem('username') || '{}');
    // this.tweetAppService.GetUserProfile(this.username).subscribe({
    //   next: response => {
    //   this.user = response;
    //   console.log(this.user);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error);
    //   }
    // });
    // this.tweetAppService.GetAllUsers().subscribe({
    //   next: response => {
    //   this.list = response;
    //   console.log(this.list);
    // },
    // error: (error: HttpErrorResponse) => {
    //   console.log(error)
    // }
    // });
  }

  Search() {
    this.uname = this.form.value["username"]
    localStorage.setItem("uname", this.uname);
    this.route.navigateByUrl('/SEARCH TWEET');

  }

  SearchUser(item: User) {
    localStorage.setItem("uname", item.userName);
    this.route.navigateByUrl('/SEARCH TWEET');
  }
  
  isReplyClicked(index: number) {
    console.log(index);
    if (this.clickedMoreButton[index] == false) {
      this.clickedMoreButton[index] = true;
    }
    else
      this.clickedMoreButton[index] = false;
  }

  logout() {
    localStorage.clear();
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.Profiles();
  }
}
