import { Component, effect, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  startWith,
} from 'rxjs';
import { ListingService } from '../../services/listing.service';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { Category, Listing } from '../../models/listing';

type Filter = Category | 'all';

interface ViewState {
  loading: boolean;
  error: string | null;
  data: Listing[];
}

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent {
  private service = inject(ListingService);
  private seo = inject(SeoService);
  i18n = inject(LanguageService);

  filters: Filter[] = ['all', 'car', 'yacht', 'helicopter', 'buggy'];

  private selected$ = new BehaviorSubject<Filter>('all');

  private state$: Observable<ViewState> = this.service.getAll().pipe(
    map((data): ViewState => ({ loading: false, error: null, data })),
    catchError(
      (): Observable<ViewState> =>
        of({ loading: false, error: 'loadError', data: [] }),
    ),
    startWith<ViewState>({ loading: true, error: null, data: [] }),
  );

  vm$ = combineLatest([this.state$, this.selected$]).pipe(
    map(([state, selected]) => ({
      ...state,
      selected,
      data:
        selected === 'all'
          ? state.data
          : state.data.filter((l) => l.category === selected),
    })),
  );

  constructor() {
    // بيتنفذ تاني كل ما اللغة تتغير
    effect(() => {
      this.seo.set(this.i18n.t('seoListTitle'), this.i18n.t('seoListDesc'));
    });
  }

  select(filter: Filter) {
    this.selected$.next(filter);
  }
}
