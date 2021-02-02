import { Exclude, Type } from 'class-transformer';

export interface PetData {
  id: string;
  dateOfBirth: string;
  sex: 'M' | 'F';
  breed: string;
  class: string;
  dateOfAcquisition: string;
  biography: string;
  profilePicture: string;
  name: string;
}

export class Pet {
  id: string;
  @Type(() => Date) dateOfBirth: Date;
  sex: 'M' | 'F';
  breed: string;
  class: string;
  name: string;
  @Type(() => Date) dateOfAcquisition: Date;
  biography: string;
  profilePicture: string;

  // Returns the age in years
  @Exclude()
  get age() {
    const diff = new Date().getTime() - this.dateOfBirth.getTime();
    return Math.floor(
      diff /
        1000 / // Milliseconds to seconds
        60 / // Seconds to minutes
        60 / // Minutes to hours
        24 / // Hours to days
        365, // Days to years
    );
  }
}
