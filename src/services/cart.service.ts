import {Injectable} from '@angular/core';
import { IProduct } from './products';

@Injectable({
    providedIn: 'root'
})

export class CartService{
    private products: IProduct[] = [];

    setProducts(products: IProduct[]){
        this.products = products;
    }

    getCartProducts(): IProduct[] {
        return this.products.filter(p => p.quantity > 0);
    }

    getTotalQuantity(): number{
        return this.products.reduce((sum, p) => sum + p.quantity, 0);
    }
}