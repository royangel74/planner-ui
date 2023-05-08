import { TestBed } from '@angular/core/testing';

import { PlannerGuard } from './planner.guard';

describe('PlannerGuard', () => {
  let guard: PlannerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlannerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
