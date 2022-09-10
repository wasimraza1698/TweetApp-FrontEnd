import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user:User;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  GoToProfile(userName:string) {
    this.router.navigateByUrl('profile/'+userName);
  }
}
