import { SpeakerFriendInterface } from '@core/interfaces/speaker-friend.interface';

//todo backend team should guarantee that i will have all fields not empty
export interface SpeakerInterface {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  registered: string;
  latitude: number;
  longitude: number;
  tags: string[];
  friends: SpeakerFriendInterface [];
  greeting: string;
  favoriteFruit: string;
}
