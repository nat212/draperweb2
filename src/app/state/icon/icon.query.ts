import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Icon, IconData } from './icon.model';
import { IconState, IconStore } from './icon.store';

@Injectable({ providedIn: 'root' })
export class IconQuery extends QueryEntity<IconState> {
  public icons$ = this.selectAll().pipe(map((entities) => this.entitiesToClasses(entities)));
  constructor(protected store: IconStore) {
    super(store);
  }

  private entityToClass(entity: IconData): Icon {
    return plainToClass(Icon, entity);
  }

  private entitiesToClasses(entities: IconData[]): Icon[] {
    return entities.map((e) => this.entityToClass(e));
  }
}
