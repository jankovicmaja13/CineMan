import { TestBed } from '@angular/core/testing';

import { CelebService } from './celebs.service';

describe('CelebService', () => {
  let service: CelebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
