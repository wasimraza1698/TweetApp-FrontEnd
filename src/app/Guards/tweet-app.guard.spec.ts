import { TestBed } from '@angular/core/testing';

import { TweetAppGuard } from './tweet-app.guard';

describe('TweetAppGuard', () => {
  let guard: TweetAppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TweetAppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
