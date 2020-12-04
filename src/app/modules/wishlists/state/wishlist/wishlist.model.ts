import { Profile } from '@modules/auth/state/auth/auth.store';

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  shared: boolean;
  items?: any[];
  user: Profile;
}
