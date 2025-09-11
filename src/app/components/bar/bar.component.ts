import { Component, inject, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-bar',
  imports: [RouterLink],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {

  private cartService = inject(CartService);

  protected cartTotal = this.cartService.getCartTotal();


}
