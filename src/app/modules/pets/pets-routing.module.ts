import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsComponent } from './pets.component';
import { PetGuard } from './state/pet/pet.guard';

const routes: Routes = [{ path: '', component: PetsComponent, canActivate: [PetGuard], canDeactivate: [PetGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
