import { Routes } from '@angular/router';
import { Cart} from './cart/cart';
import { ListItens } from './list-itens/list-itens';

export const routes: Routes = [
    { path: '', 
    component: ListItens
  },

  { path: 'carrinho', 
    component: Cart }
];
