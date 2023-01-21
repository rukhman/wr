import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationRoutingNames } from 'src/app/animations/animations';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  {
    path: "",
    component: ContactsComponent,
    data: { animation: AnimationRoutingNames.CONTACTS }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
