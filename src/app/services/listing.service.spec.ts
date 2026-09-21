import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ListingService } from './listing.service';

describe('ListingService', () => {
  let service: ListingService;
  let http: HttpTestingController;

  const mock = [
    {
      id: 1,
      category: 'car',
      emoji: '🏎️',
      name: { en: 'A', ar: 'أ' },
      description: { en: 'd', ar: 'و' },
      pricePerDay: 100,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ListingService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getAll returns the listings from the API', () => {
    service.getAll().subscribe((list) => expect(list.length).toBe(1));
    http.expectOne('assets/listings.json').flush(mock);
  });

  it('getById errors when the listing does not exist', () => {
    service.getById(99).subscribe({
      next: () => fail('should have errored'),
      error: (err) => expect(err.message).toBe('Listing not found'),
    });
    http.expectOne('assets/listings.json').flush(mock);
  });
});
