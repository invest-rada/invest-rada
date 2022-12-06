import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WatchlistComponent } from './watchlist.component';

const routes: Routes = [
  {
    path: '',
    component: WatchlistComponent,
    data: {
      title: $localize`Watchlist`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchlistRoutingModule {
}
