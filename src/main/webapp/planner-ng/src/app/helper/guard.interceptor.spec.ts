import { TestBed } from '@angular/core/testing';

import { GuardInterceptor } from './guard.interceptor';

describe('GuardInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GuardInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GuardInterceptor = TestBed.inject(GuardInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
