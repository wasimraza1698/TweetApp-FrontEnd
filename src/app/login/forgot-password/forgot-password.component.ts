import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TweetAppService } from '../../Services/tweet-app.service';
import { ResetPasswordRequest } from 'src/app/Models/reset-password-request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordRequest : ResetPasswordRequest;
  submitted = false;
  userForm : FormGroup;
  statuscode : number;
  message : string;
  emailInvalid : boolean = false;
  phonenoInvalid : boolean = false;
  passwordInvalid : boolean = false;
  passwordsNotMatching :boolean = false;

  constructor(private formbuilder:FormBuilder, private tweetAppService:TweetAppService) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      email: ['', Validators.required],
      phoneno: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
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

  onSubmitPassword() {
    this.submitted=true;

    if(this.userForm.invalid) {
      return;
    }
    else {
      this.forgot();
    }
  }

  forgot() {
    if (!this.emailInvalid && !this.phonenoInvalid && !this.passwordInvalid && !this.passwordsNotMatching) {
      this.resetPasswordRequest = new ResetPasswordRequest();
      this.resetPasswordRequest.emailId = this.userForm.value["email"];
      this.resetPasswordRequest.newPassword = this.userForm.value["password"];
      this.resetPasswordRequest.contactNumber = this.userForm.value["phoneno"];
      this.tweetAppService.resetPassword(this.resetPasswordRequest).subscribe({
        next: response => {
          this.message = response;
          alert(this.message);
          console.log(this.message);
          window.location.reload()
        },
        error: (error : HttpErrorResponse) => {
          this.statuscode = error.status;
          alert(this.statuscode);
          console.log(this.statuscode);
        }
      });
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
