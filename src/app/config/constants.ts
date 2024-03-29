import { Injectable } from '@angular/core'; 

@Injectable()
export class Constants {
    public static readonly SITE_TITLE: string = 'TweetApp';

    public static readonly BASE_API_URL: string = 'http://40.81.251.15/api/v1.0/tweets/';
    public static readonly LOGIN_ENDPOINT: string =  'login';
    public static readonly RESET_PASSWORD_ENDPOINT = 'reset-password';
    public static readonly REGISTER_ENDPOINT = 'register';
    public static readonly SEARCH_USER = 'search/';
    public static readonly POST_TWEET = '/add';
    public static readonly GET_ALL_TWEEETS = 'all';
    public static readonly GET_ALL_USERS = 'users/all';
    public static readonly REPLY_TO_TWEET = '/reply/'
    public static readonly LIKE_TWEET = '/like/';
    public static readonly EDIT_TWEET = '/update/';
    public static readonly DELETE_TWEET = '/delete/';
    public static readonly GET_TWEET = 'tweets/';
}