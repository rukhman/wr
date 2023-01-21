import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/types/types';
import { getCartState, getSelectedInCart } from 'src/app/store/auth-store/auth.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    '../catalog/catalog.component.scss',
    './cart.component.scss'
  ]
})
export class CartComponent implements OnInit {
  products$!: Observable<Product[]>;
  totalCost$!: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(getCartState));
    this.getTotalCost();
  }

  getTotalCost() {
    this.totalCost$ = this.store.pipe(
      select(getSelectedInCart),
    ).pipe(
      map((array) => array.map((item => item.price))),
      map((ids) => ids.reduce((acc, current) => {
        return acc + current
      }, 0)),
    )
  }
}
