import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { addIntoSelectedCartState, changeCartState, changeSelectedStateInCart, deleteFromSelectedCartState } from 'src/app/store/auth-store/auth.actions';
import { getSelectedInCart } from 'src/app/store/auth-store/auth.selectors';
import { Product, ProductImage } from '../../types/types';

@Component({
  selector: 'cart-card',
  templateUrl: './product-cart-card.component.html',
  styleUrls: ['./product-cart-card.component.scss']
})
export class ProductCartCardComponent implements OnInit, OnDestroy {
  defaultImage = '../../../assets/svg/no_img1.svg';
  __images!: Array<ProductImage>;
  checkboxControl: FormControl = new FormControl();
  destroy$ = new Subject();
  @Input("product") product!: Product;
  @Input("name") name!: string;
  @Input("description") description!: string;
  @Input("price") price!: number;
  @Input("images") set images(imgs: Array<ProductImage>) {
    this.__images = imgs
  }
  get images(): Array<any> {
    const images = this.__images?.length ? this.__images : [{ image: this.defaultImage }]
    return images
  }

  constructor(private store: Store, public api: ApiService) { }

  ngOnInit(): void {
    this.subscribeCheckboxState();
    this.subscribeSelectedInCartState();
  }

  subscribeCheckboxState() {
    this.checkboxControl.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((checkbox) => {
      checkbox ?
      this.addIntoSelectedCartState() :
      this.deleteFromSelectedCartState()
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next('unsubscribe');
    this.destroy$.complete();
  }

  subscribeSelectedInCartState() {
    this.store.pipe(
      select(getSelectedInCart),
    ).pipe(
      map((array) => array.map((item => item.id))),
      map((ids) => {
        if(ids.includes(this.product.id)) {
          this.checkboxControl.setValue(true, { emitEvent: false });
        } else {
          this.checkboxControl.setValue(false, { emitEvent: false })
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  changeSelectedInCartState(): void {
    this.store.dispatch(changeSelectedStateInCart({ product: this.product }))
  }

  addIntoSelectedCartState(): void {
    this.store.dispatch(addIntoSelectedCartState({ product: this.product }))
  }

  deleteFromSelectedCartState(): void {
    this.store.dispatch(deleteFromSelectedCartState({ product: this.product }))
  }
}
