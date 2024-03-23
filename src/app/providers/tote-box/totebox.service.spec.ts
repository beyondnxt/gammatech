import { TestBed } from '@angular/core/testing';

import { ToteboxService } from './totebox.service';

describe('ToteboxService', () => {
  let service: ToteboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToteboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
