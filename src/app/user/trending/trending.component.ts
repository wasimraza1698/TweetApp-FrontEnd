import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  @Input() users:Array<User>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    let index = this.users.findIndex(u => u.userName == username);
    this.users.splice(index, 1);
  }

  GoToProfile(userName:string) {
    this.router.navigateByUrl('profile/'+userName);
  }

}
