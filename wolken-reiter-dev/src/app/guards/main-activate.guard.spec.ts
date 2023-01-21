import { TestBed } from '@angular/core/testing';

import { MainActivateGuard } from './main-activate.guard';

describe('MainActivateGuard', () => {
  let guard: MainActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
