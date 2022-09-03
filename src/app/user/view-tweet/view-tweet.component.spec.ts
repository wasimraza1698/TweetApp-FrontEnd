import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTweetComponent } from './view-tweet.component';

describe('ViewTweetComponent', () => {
  let component: ViewTweetComponent;
  let fixture: ComponentFixture<ViewTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
