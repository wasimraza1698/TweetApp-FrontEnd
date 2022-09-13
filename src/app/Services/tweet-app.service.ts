import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResetPasswordRequest } from '../Models/reset-password-request';
import { Constants } from '../config/constants';
import { UserRequest } from '../Models/user-request';
import { TweetRequest } from '../Models/tweet-request';
import { ReplyRequest } from '../Models/reply-request';

const requestHeaders = {
  header: new HttpHeaders({
    'Content-Type': 'application/json; charset = utf-8'
  }),
  headersWithToken: new HttpHeaders({
    'Content-Type': 'application/json; charset = utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem('jwToken')
})}

@Injectable({
  providedIn: 'root'
})
export class TweetAppService {
  baseurl: string = Constants.BASE_API_URL;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    const headers = requestHeaders.header;
    return this.http.get<any>(encodeURI(this.baseurl + 'login?username=' + username + '&password=' + password), { headers, responseType: 'json'});
  }

  public resetPassword(resetPasswordRequest : ResetPasswordRequest): Observable<string> {
    const headers = requestHeaders.header;
    return this.http.put<string>(this.baseurl + Constants.RESET_PASSWORD_ENDPOINT, resetPasswordRequest, {headers, responseType: 'text' as 'json'});
  }

  public register(userRequest : UserRequest): Observable<string> {
    const headers = requestHeaders.header;
    return this.http.post<string>(this.baseurl + Constants.REGISTER_ENDPOINT, userRequest, {headers, responseType: 'text' as 'json'});
  }

  public search(key : string): Observable<any> {
    const headers = requestHeaders.header;
    return this.http.get<any>(this.baseurl + Constants.SEARCH_USER + key, { headers, responseType: 'json'});
  }

  public postTweet(tweet:TweetRequest): Observable<string> {
    let username = localStorage.getItem('username');
    const headers = requestHeaders.headersWithToken;
    return this.http.post<string>(this.baseurl + username + Constants.POST_TWEET, tweet, {headers, responseType: 'text' as 'json'});
  }

  public getAllTweets(): Observable<any>{
    const headers = requestHeaders.header;
    return this.http.get(this.baseurl + Constants.GET_ALL_TWEEETS, {headers, responseType: 'json'});
  }

  public reply(tweetId: string, reply: ReplyRequest): Observable<string> {
    let username = localStorage.getItem('username');
    const headers = requestHeaders.headersWithToken;
    return this.http.post<string>(this.baseurl + username + Constants.REPLY_TO_TWEET + tweetId, reply, {headers, responseType: 'text' as 'json'});
  }

  public like(tweetId:string): Observable<any> {
    let username = localStorage.getItem('username');
    const headers = requestHeaders.headersWithToken;
    return this.http.put<any>(this.baseurl + username + Constants.LIKE_TWEET + tweetId, null, {headers, responseType: 'json'});
  }

  public edit(tweetId:string, tweet:TweetRequest): Observable<any> {
    let username = localStorage.getItem('username');
    const headers = requestHeaders.headersWithToken;
    return this.http.put<any>(this.baseurl + username + Constants.EDIT_TWEET + tweetId, tweet, {headers, responseType: 'json'});
  }

  public delete (tweetId:string): Observable<string>{
    let username = localStorage.getItem('username');
    const headers = requestHeaders.headersWithToken;
    return this.http.delete<string>(this.baseurl + username + Constants.DELETE_TWEET + tweetId, {headers, responseType: 'text' as 'json'});
  }
}
