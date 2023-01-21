import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBreakPoints, Product, ProductImage } from 'src/app/shared/types/types';
import { addIntoCartState, addIntoSelectedCartState } from 'src/app/store/auth-store/auth.actions';
import { getCartState, getFavoriteState } from 'src/app/store/auth-store/auth.selectors';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';
import { ConfirmWindowComponent } from '../../confirm-window/confirm-window.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  defaultImage = '../../../assets/svg/no_img1.svg';
  inFavorite$!: Observable<(number | undefined)[]>;
  inCart$!:Observable<(number | undefined)[]>;
  isHandset = false;
  __images!: Array<ProductImage>;
  @Input("product") product!: Product;
  @Input("images") set images(imgs: Array<ProductImage>) {
    this.__images = imgs
  }
  get images(): Array<any> {
    const images = this.__images?.length ? this.__images : []
    return images
  }

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public api: ApiService,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.inFavorite$ = this.getFavoriteState();
    this.inCart$ = this.getCartState();
    this.store.pipe(select(getHandset)).subscribe((isHandset: boolean) => {
      this.isHandset = isHandset
    })
  }

  getFavoriteState(): Observable<(number | undefined)[]> {
    return this.store.pipe(
      select(getFavoriteState),
    ).pipe(map((array) => array.map((item => item.id))))
  }

  getCartState(): Observable<(number | undefined)[]> {
    return this.store.pipe(
      select(getCartState),
    ).pipe(map((array) => array.map((item => item.id))))
  }

  buy(): void {
    this.store.dispatch(addIntoSelectedCartState({ product: this.product, reset: true})),
    this.store.dispatch(addIntoCartState({ product: this.product})),
    this.router.navigate(["cart"])
  }

  delete(): void {
    let config = this.api.getDialogConfig(`Аre you sure you want to remove this product?`, "Ok", "Cancel", this.isHandset ? "30%" : "60%")
    this.dialog.open(ConfirmWindowComponent, config)
    .afterClosed()
    .subscribe((resp) => {
      if (resp) {
        this.api.deleteProduct(this.product.id).subscribe()
      }
    })
  }

  edit() {
    this.router.navigate(["add-product"],
    {
      state: {
        product: this.product
      }
    })
  }
}
