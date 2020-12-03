import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistsHomeComponent } from './pages/wishlists-home/wishlists-home.component';

const routes: Routes = [
  {
    path: '',
    component: WishlistsHomeComponent,
    data: { title: 'Wishlists' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistsRoutingModule {}
