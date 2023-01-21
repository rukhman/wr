import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/types/types';
import { getFavoriteState } from 'src/app/store/auth-store/auth.selectors';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: [
    '../catalog/catalog.component.scss',
    './favorite.component.scss'
  ]
})
export class FavoriteComponent implements OnInit {
  products$!: Observable<Product[]>;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(getFavoriteState))
  }
}
