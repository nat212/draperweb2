import { Profile } from '@modules/auth/state/auth/auth.store';
import { WishlistItem } from '../wishlist-item/wishlist-item.model';

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  shared: boolean;
  items?: WishlistItem[];
  user: Profile;
}
