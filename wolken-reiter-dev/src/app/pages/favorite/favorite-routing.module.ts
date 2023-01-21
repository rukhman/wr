import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationRoutingNames } from 'src/app/animations/animations';
import { FavoriteComponent } from './favorite.component';

const routes: Routes = [
  {
    path: "",
    component: FavoriteComponent,
    data: { animation: AnimationRoutingNames.FAVORITE }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule { }
