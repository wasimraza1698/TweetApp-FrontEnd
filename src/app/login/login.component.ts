import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '../Models/token';
import { TweetAppService } from '../Services/tweet-app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  token : Token;
  userForm : FormGroup;
  message : string;
  statuscode : number;
  showPassword : boolean;

  constructor(private formbuilder: FormBuilder, private tweetAppService: TweetAppService, private route: Router) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLogin(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    else {
      this.validate();
    }
  }

  validate(): void {
    let username = this.userForm.value['username'];
    let password = this.userForm.value['password'];

    this.tweetAppService.login(username, password).subscribe({
      next:  response => {
        this.token = response;
        this.message = this.token.message;
        localStorage.setItem('jwToken', this.token.jwToken);
        localStorage.setItem('username', this.token.userName);
        alert(this.message);
        console.log(this.message);
        this.route.navigateByUrl('home');
      },
      error: (error : HttpErrorResponse) => {
        this.statuscode = error.status;
        alert(this.statuscode);
        console.log(this.statuscode);
      }
    })
  }

  get form() {
    return this.userForm.controls;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  onReset(): void {
    this.submitted=false;
    this.userForm.reset();
  }
}
