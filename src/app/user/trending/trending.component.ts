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
    this.users = this.users.slice(0, 4);
  }

  GoToProfile(userName:string) {
    this.router.navigateByUrl('profile/'+userName);
  }

}
