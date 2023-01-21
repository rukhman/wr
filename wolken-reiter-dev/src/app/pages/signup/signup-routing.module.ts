import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationRoutingNames } from 'src/app/animations/animations';
import { MainDeactivateGuard } from 'src/app/guards/main-deactivate.guard';
import { SignupComponent } from './signup.component';
import { SignupModule } from './signup.module';

const routes: Routes = [
  {
    path: "",
    component: SignupComponent,
    canDeactivate: [MainDeactivateGuard],
    data: { animation: AnimationRoutingNames.SIGNUP }
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SignupRoutingModule {}
