import { Routes } from '@angular/router';
import { App } from './app';
import { CartPage } from './components/cart/cart';
export const routes: Routes = [
    {path: '', component:App},
    {path: 'carrinho', component:CartPage}
];
