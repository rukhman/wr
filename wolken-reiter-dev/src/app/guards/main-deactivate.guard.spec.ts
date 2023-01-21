import { TestBed } from '@angular/core/testing';

import { MainDeactivateGuard } from './main-deactivate.guard';

describe('MainDeactivateGuard', () => {
  let guard: MainDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
