import { TestBed } from '@angular/core/testing';

import { TokensInterceptor } from './tokens.interceptor';

describe('TokensInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokensInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokensInterceptor = TestBed.inject(TokensInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
