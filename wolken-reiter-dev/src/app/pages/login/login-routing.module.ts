import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationRoutingNames } from 'src/app/animations/animations';
import { MainDeactivateGuard } from 'src/app/guards/main-deactivate.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    canDeactivate: [MainDeactivateGuard],
    path: '',
    component: LoginComponent,
    data: { animation: AnimationRoutingNames.LOGIN }
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule{}
