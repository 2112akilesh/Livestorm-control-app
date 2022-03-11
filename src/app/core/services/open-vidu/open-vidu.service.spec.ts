import { TestBed } from '@angular/core/testing';

import { OpenViduService } from './open-vidu.service';

describe('OpenViduService', () => {
  let service: OpenViduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenViduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
