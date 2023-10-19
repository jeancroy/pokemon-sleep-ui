import {ObjectId} from 'bson';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {IsoDateString} from '@/types/date';


export type UserDataInDatabase<T> = {
  userId: string,
  data: T,
};

export const userActivationType = [
  'adsFree',
  'premium',
] as const;

export type UserActivationType = typeof userActivationType[number];

export const userActivationSource = [
  'discord',
  'patreon',
] as const;

export type UserActivationSource = typeof userActivationSource[number];

export const userActivationContact = [
  ...userActivationSource,
  'line',
] as const;

export type UserActivationContact = typeof userActivationContact[number];

export type UserActivationStatus = FilterInclusionMap<UserActivationType>;

export type UserActivationProperties = {
  expiry: Date,
  source: UserActivationSource | null,
  contact: {[contact in UserActivationContact]?: string | null},
  isSpecial: boolean,
  note: string,
  activation: UserActivationStatus,
};

export type UserActivationPropertiesAtClient = Omit<UserActivationProperties, 'expiry'> & {
  expiry: IsoDateString,
};

export type UserActivationKey = UserActivationProperties & {
  key: string,
  generatedAt: Date,
};

export type UserActivationData = UserActivationKey & {
  userId: ObjectId,
};

export type UserActivationDataAtClient = Omit<UserActivationData, 'expiry' | 'generatedAt' | 'userId'> & {
  expiry: IsoDateString,
  generatedAt: IsoDateString,
  userId: string,
};

export type UserIdToEmailMap = {[userId in string]: string | null | undefined};