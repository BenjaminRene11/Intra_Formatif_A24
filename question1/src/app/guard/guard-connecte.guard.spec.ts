import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardConnecteGuard } from './guard-connecte.guard';

describe('guardConnecteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardConnecteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
