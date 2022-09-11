import { Injectable } from '@angular/core'; 

@Injectable()
export class Constants {
    public static readonly SITE_TITLE: string = 'TweetApp';

    public static readonly BASE_API_URL: string = 'https://localhost:5001/api/v1.0/tweets/';
    public static readonly LOGIN_ENDPOINT: string =  'login';
    public static readonly RESET_PASSWORD_ENDPOINT = 'reset-password';
    public static readonly REGISTER_ENDPOINT = 'register';
    public static readonly SEARCH_USER = 'search/';
    public static readonly POST_TWEET = '/add';
    public static readonly GET_ALL_TWEEETS = 'all';
    public static readonly REPLY_TO_TWEET= '/reply/'
}