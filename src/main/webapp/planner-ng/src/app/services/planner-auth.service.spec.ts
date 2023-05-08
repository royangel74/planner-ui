import { TestBed } from '@angular/core/testing';

import { PlannerAuthService } from './planner-auth.service';

describe('PlannerAuthService', () => {
  let service: PlannerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
