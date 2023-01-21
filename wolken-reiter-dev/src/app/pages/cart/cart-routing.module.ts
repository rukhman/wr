import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationRoutingNames } from 'src/app/animations/animations';
import { CartComponent } from './cart.component';

const routes: Routes = [
  {
    path: "",
    component: CartComponent,
    data: { animation: AnimationRoutingNames.CART }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
