import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../Models/token';
import { ResetPasswordRequest } from '../Models/reset-password-request';
import { Constants } from '../config/constants';
import { UserRequest } from '../Models/user-request';

const requestHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + localStorage.getItem('token')
})}

@Injectable({
  providedIn: 'root'
})
export class TweetAppService {
  baseurl: string = Constants.BASE_API_URL;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset = utf-8');
    return this.http.get<any>(encodeURI(this.baseurl + 'login?username=' + username + '&password=' + password), { headers, responseType: 'json'});
  }

  public resetPassword(resetPasswordRequest : ResetPasswordRequest): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset = utf-8');
    return this.http.put<string>(this.baseurl + Constants.RESET_PASSWORD_ENDPOINT, resetPasswordRequest, {headers, responseType: 'text' as 'json'});
  }

  public register(userRequest : UserRequest): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset = utf-8');
    return this.http.post<string>(this.baseurl + Constants.REGISTER_ENDPOINT, userRequest, {headers, responseType: 'text' as 'json'});
  }
}
