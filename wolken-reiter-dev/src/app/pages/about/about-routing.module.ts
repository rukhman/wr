import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationRoutingNames } from 'src/app/animations/animations';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: "",
    component: AboutComponent,
    data: { animation: AnimationRoutingNames.ABOUT }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
