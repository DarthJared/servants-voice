import { TestBed } from '@angular/core/testing';

import { SheetsQuotesService } from './sheets-quotes.service';

describe('SheetsQuotesService', () => {
  let service: SheetsQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
