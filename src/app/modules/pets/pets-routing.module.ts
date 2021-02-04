import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsHomeComponent } from './pages/pets-home/pets-home.component';
import { PetsComponent } from './pages/pets/pets.component';
import { VetVisitsComponent } from './pages/vet-visits/vet-visits.component';
import { PetGuard } from './state/pet/pet.guard';

const routes: Routes = [
  {
    path: '',
    component: PetsHomeComponent,
    canActivate: [PetGuard],
    canDeactivate: [PetGuard],
    children: [
      { path: '', redirectTo: 'pets', pathMatch: 'full' },
      { path: 'pets', component: PetsComponent },
      { path: 'vet', component: VetVisitsComponent, data: { title: 'Vet Visits', breadcrumb: 'Vet Visits' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
