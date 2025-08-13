import { TestBed } from '@angular/core/testing';

import { ApiSpec } from './api.spec';

describe('ApiSpec', () => {
  let service: ApiSpec;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSpec);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
