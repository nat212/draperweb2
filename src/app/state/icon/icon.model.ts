import { Expose } from 'class-transformer';

export interface IconData {
  id: string;
  name: string;
  icon: string;
}

export class Icon {
  @Expose() public readonly id: string;
  @Expose() public readonly name: string;
  @Expose() public readonly icon: string;
}
