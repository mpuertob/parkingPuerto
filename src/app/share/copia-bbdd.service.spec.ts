import { TestBed } from '@angular/core/testing';

import { CopiaBBDDService } from './copia-bbdd.service';

describe('CopiaBBDDService', () => {
  let service: CopiaBBDDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopiaBBDDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
