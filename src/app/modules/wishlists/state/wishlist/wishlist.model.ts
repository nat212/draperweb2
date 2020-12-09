import { Profile } from '@modules/auth/state/auth/auth.store';
import { Expose } from 'class-transformer';
import { WishlistItem } from '../wishlist-item/wishlist-item.model';

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  shared: boolean;
  items?: WishlistItem[];
  user: Profile;
}

export class WishlistModel {
  @Expose() public readonly id: string;
  @Expose() public readonly user: Profile;
  @Expose() public readonly items: WishlistItem[];
  @Expose() public readonly shared: boolean;
  @Expose() public readonly name: string;

  public get userName(): string {
    return this.user.displayName;
  }
}
