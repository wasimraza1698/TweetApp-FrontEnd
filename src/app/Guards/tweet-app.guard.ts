import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TweetAppGuard implements CanActivate {

  constructor(public router:Router){}
  
  canActivate(): boolean {
    if (this.IsLoggedIn()) {
        return true;
    }
    this.router.navigate(['/login']);
    return false;
}
  
  IsLoggedIn():boolean
    {
        let token = localStorage.getItem("jwToken");
        let username = localStorage.getItem("username");
        if (token == null || username == null)
            return false;
        return true;

    }
}
