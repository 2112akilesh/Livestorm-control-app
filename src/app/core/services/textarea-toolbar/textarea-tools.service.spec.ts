import { TestBed } from '@angular/core/testing';

import { TextareaToolsService } from './textarea-tools.service';

describe('TextareaToolsService', () => {
  let service: TextareaToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextareaToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
