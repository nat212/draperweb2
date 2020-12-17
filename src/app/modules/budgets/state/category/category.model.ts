import { Expose, Type } from 'class-transformer';
import { Icon, IconData } from 'src/app/state/icon/icon.model';

export interface Category {
  id: string;
  name: string;
  iconId: string;
  icon?: IconData;
}

export class CategoryModel {
  public readonly id: string;
  public readonly name: string;
  public readonly iconId: string;
  @Expose({ name: 'icon' }) @Type(() => Icon) private readonly _icon: Icon;

  public get icon(): string {
    return this._icon?.icon;
  }
}
