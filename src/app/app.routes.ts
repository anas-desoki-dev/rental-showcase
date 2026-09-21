import { Routes } from '@angular/router';
import { ListingsComponent } from './pages/listings/listings.component';
import { ListingDetailsComponent } from './pages/listing-details/listing-details.component';

export const routes: Routes = [
  { path: '', component: ListingsComponent },
  { path: 'listing/:id', component: ListingDetailsComponent },
];
