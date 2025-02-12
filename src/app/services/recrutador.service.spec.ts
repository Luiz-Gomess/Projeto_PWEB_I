import { TestBed } from '@angular/core/testing';

import { RecrutadorService } from './recrutador.service';

describe('RecrutadorService', () => {
  let service: RecrutadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecrutadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
