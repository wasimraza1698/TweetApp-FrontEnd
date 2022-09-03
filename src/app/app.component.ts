import { Component, OnInit } from '@angular/core';
import { Constants } from './config/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = Constants.SITE_TITLE;

  ngOnInit() { 
    console.log(this.title + " started"); 
  } 
}
