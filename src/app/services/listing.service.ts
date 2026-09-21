import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Listing } from '../models/listing';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private http = inject(HttpClient);
  private url = 'assets/listings.json';

  getAll(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.url);
  }

  getById(id: number): Observable<Listing> {
    return this.getAll().pipe(
      map((list) => {
        const item = list.find((l) => l.id === id);
        if (!item) throw new Error('Listing not found');
        return item;
      }),
    );
  }
}
