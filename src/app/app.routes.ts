import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { PageCartComponent } from './components/page-cart/page-cart.component';

export const routes: Routes = [
    { path: '', redirectTo: 'cart', pathMatch: 'full' },
    { path: 'cart', component: CartComponent },
    { path: 'pageCart', component: PageCartComponent }
];
