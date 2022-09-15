import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserRequest } from 'src/app/Models/user-request';
import { TweetAppService } from 'src/app/Services/tweet-app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm : FormGroup;
  submitted : boolean = false;
  usernameInvalid : boolean = false;
  emailInvalid : boolean = false;
  passwordInvalid : boolean = false;
  phonenoInvalid : boolean = false;
  passwordsNotMatching : boolean = false;
  userRegistration : UserRequest;
  message : string;
  statuscode : number;

  constructor(private formBuilder : FormBuilder, private tweetAppService : TweetAppService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneno: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  validateUsername(username : HTMLInputElement) {
    if (username.value.length == 0) {
      this.usernameInvalid = false;
    }
    else {
      if (/^[a-z0-9_]{6,20}$/.test(username.value)) {
        this.usernameInvalid = false;
      }
      else {
        this.usernameInvalid = true;
      }
    }
  }

  validateEmail(email : HTMLInputElement) {
    if (email.value.length == 0) {
      this.emailInvalid = false;
    }
    else {
      if (/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email.value)) {
        this.emailInvalid = false;
      }
      else {
        this.emailInvalid = true;
      }
    }
  }

  validateNumber(phoneno : HTMLInputElement) {
    if (phoneno.value.length != 0 && phoneno.value.length != 10)
    {
      this.phonenoInvalid = true;
    }
    else {
      this.phonenoInvalid = false;
    }
  }

  validatePassword(password : HTMLInputElement) {
    if (password.value.length == 0) {
      this.passwordInvalid = false;
    }
    else {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/.test(password.value)) {
        this.passwordInvalid = false;
      }
      else {
        this.passwordInvalid = true;
      }
    }
  }

  matchPasswords(password : HTMLInputElement,confirmPassword : HTMLInputElement) {
    if (password.value.length == 0 || confirmPassword.value.length == 0)
    {
      this.passwordsNotMatching = false;
    }
    else {
      if (password.value == confirmPassword.value) {
        this.passwordsNotMatching = false;
      }
      else {
        this.passwordsNotMatching = true;
      }
    }
  }

  onSubmit() {
    this.submitted=true;

    if(this.userForm.invalid) {
      return;
    }
    else {
      this.register();
    }
  }

  register() {
    if (!this.emailInvalid && !this.passwordInvalid && !this.passwordsNotMatching && !this.phonenoInvalid) {
      this.userRegistration = new UserRequest();
      this.userRegistration.userName = this.userForm.value['username'];
      this.userRegistration.emailId = this.userForm.value['email'];
      this.userRegistration.contactNumber = this.userForm.value['phoneno'];
      this.userRegistration.firstName = this.userForm.value['firstName'];
      this.userRegistration.lastName = this.userForm.value['lastName'];
      this.userRegistration.password = this.userForm.value['password'];
      this.tweetAppService.register(this.userRegistration).subscribe({
        next: response => {
          this.message = response;
          alert(this.message);
          console.log(this.message);
          window.location.reload();
        },
        error: (error : HttpErrorResponse) => {
          this.statuscode = error.status;
          alert(this.statuscode);
          console.log(this.statuscode);
        }
      })
    }
  }

  get form() {
    return this.userForm.controls;
  }

  onReset() {
    this.submitted=false;
    this.userForm.reset();
  }
}
