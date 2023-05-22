import { TestBed } from '@angular/core/testing';

import { EventtypeService } from './eventtype.service';

describe('EventtypeService', () => {
  let service: EventtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
