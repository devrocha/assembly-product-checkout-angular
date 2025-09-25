import { Routes } from '@angular/router';
import { CartPage } from './components/cart/cart';
import { ListItems } from './components/list-items/list-items';

export const routes: Routes = [
  {
    path: '',
    component: ListItems
  },
  {
    path: 'carrinho',
    component: CartPage
  }
];
