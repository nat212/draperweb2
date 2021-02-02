import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from './pet.model';
import { PetState, PetStore } from './pet.store';

@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC,
})
@Injectable({ providedIn: 'root' })
export class PetQuery extends QueryEntity<PetState> {
  constructor(protected store: PetStore) {
    super(store);
  }
  public models$: Observable<Pet[]> = this.selectAll().pipe(map((pets) => pets.map((p) => plainToClass(Pet, p))));
}
