import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  width:any;
  displayFullProfile : boolean;
  users:Array<User>;
  user:User;
  statuscode:number;

  constructor(private router:Router, private tweetAppService:TweetAppService) { }

  ngOnInit(): void {
    this.width = window.innerWidth;
    if (this.width <= 1450) {
      this.displayFullProfile = false;
    }
    else {
      this.displayFullProfile = true;
    }

    this.GetUser();
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

  GetUser(){
    let username = localStorage.getItem('username');
    if (username != null){
      this.tweetAppService.search(username).subscribe({
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
  }

  GoToHome(){
    this.router.navigateByUrl('home');
  }

  GoToAllUsers(){
    this.router.navigateByUrl('all-users');
  }

  GoToProfile(){
    var userName = localStorage.getItem('username');
    this.router.navigateByUrl('profile/'+userName);
  }

  Logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
