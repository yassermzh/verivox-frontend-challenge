import { TestBed } from '@angular/core/testing';

import { TarifService } from './tarifs.service';

describe('TarifsService', () => {
  let service: TarifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
