import { Directive, HostBinding } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';
import { FormBreakPoints } from '../types/types';

@Directive({
  selector: '[breakpointWidth]'
})
export class BreakpointWidthDirective {
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL

  constructor(private store: Store) {
    this.store.pipe(select(getHandset)).subscribe((isHandset: boolean) => {
      this.hostWidth = isHandset ? FormBreakPoints.SMALL : FormBreakPoints.LARDGE
    })
   }

  @HostBinding("style.width") get getWidth() {
    return this.hostWidth
  }
}
