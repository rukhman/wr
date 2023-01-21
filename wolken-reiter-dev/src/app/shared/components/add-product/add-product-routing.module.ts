import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimationRoutingNames } from 'src/app/animations/animations';
import { AddProductComponent } from './add-product.component';

const routes: Routes = [
  {
    path: "",
    component: AddProductComponent,
    data: { animation: AnimationRoutingNames.NEW_PRODUCT}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAddProductRoutingModule {}
