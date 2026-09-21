import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';
import { ListingService } from '../../services/listing.service';
import { LanguageService } from '../../services/language.service';
import { Listing } from '../../models/listing';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';

interface DetailsState {
  loading: boolean;
  error: string | null;
  item: Listing | null;
}

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, RouterLink, BookingFormComponent],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  private route = inject(ActivatedRoute);
  private service = inject(ListingService);
  i18n = inject(LanguageService);

  vm$: Observable<DetailsState> = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) =>
      this.service.getById(id).pipe(
        map((item): DetailsState => ({ loading: false, error: null, item })),
        catchError(
          (): Observable<DetailsState> =>
            of({ loading: false, error: 'notFound', item: null }),
        ),
        startWith<DetailsState>({ loading: true, error: null, item: null }),
      ),
    ),
  );
}
