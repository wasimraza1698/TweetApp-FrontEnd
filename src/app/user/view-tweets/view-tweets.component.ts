import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/Models/tweet';

@Component({
  selector: 'app-view-tweets',
  templateUrl: './view-tweets.component.html',
  styleUrls: ['./view-tweets.component.css']
})
export class ViewTweetsComponent implements OnInit {
  @Input() tweets: Array<Tweet>;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  GoToProfile(username:string){
    this.router.navigateByUrl('profile/'+username);
  }

  GoToTweet(tweetId:string){
    this.router.navigateByUrl('view-tweet/'+tweetId);
  }
  
  ConvertTime(time: Date){
    time = time
    let timeInString = time.toString()
    var date = new Date((timeInString || "").replace(/-/g,"/").replace(/[TZ]/g," ").concat(" UTC")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
      return date.toString().substring(0, 15);
        
    return day_diff == 0 && (
        diff < 60 && "just now" ||
        diff < 120 && "1m" ||
        diff < 3600 && Math.floor( diff / 60 ) + "m" ||
        diff < 7200 && "1h" ||
        diff < 86400 && Math.floor( diff / 3600 ) + "h") ||
        day_diff == 1 && "yesterday" ||
        day_diff < 7 && day_diff + "d" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + "w"; 
  }
}
