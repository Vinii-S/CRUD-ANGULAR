import { TestBed } from '@angular/core/testing';

import { ApiUsuarios } from './api-usuarios';

describe('ApiUsuarios', () => {
  let service: ApiUsuarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUsuarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
