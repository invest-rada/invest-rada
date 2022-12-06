import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscoverComponent } from './discover.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent,
    data: {
      title: $localize`Discover`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverRoutingModule {
}
