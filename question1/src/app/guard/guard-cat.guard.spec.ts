import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardCatGuard } from './guard-cat.guard';

describe('guardCatGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardCatGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
