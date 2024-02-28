import {ObjectId} from 'bson';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {IsoDateString, IsoTimestampString} from '@/types/date';
import {MongoDataOfUser} from '@/types/mongo/user';


export type UserDataInDatabase<T> = MongoDataOfUser & {
  data: T,
};

export const activationType = [
  'adsFree',
  'premium',
] as const;

export type ActivationType = typeof activationType[number];

export const activationSource = [
  'discord',
  'patreon',
  'github',
] as const;

export type ActivationSource = typeof activationSource[number];

export const activationSourceAutomated = [
  'adClick',
] as const;

export const activationSourceAll = [
  ...activationSource,
  ...activationSourceAutomated,
] as const;

export type ActivationSourceAll = typeof activationSourceAll[number];

export const activationContact = [
  ...activationSource,
  'line',
] as const;

export type ActivationContact = typeof activationContact[number];

export type ActivationStatus = FilterInclusionMap<ActivationType>;

export type ActivationProperties = {
  expiry: Date,
  source: ActivationSourceAll | null,
  contact: {[contact in ActivationContact]?: string | null},
  isCmsMod?: boolean,
  isActivationLocked?: boolean,
  isFrozen?: boolean,
  note: string,
  activation: ActivationStatus,
};

export type ActivationPropertiesAtClient = Omit<ActivationProperties, 'expiry'> & {
  expiry: IsoTimestampString,
};

export type ActivationKey = ActivationProperties & {
  key: string,
  generatedAt: Date,
};

export type ActivationKeyAtClient =
  ActivationPropertiesAtClient &
  Omit<ActivationKey, keyof ActivationProperties | 'generatedAt'> & {
    generatedAt: IsoDateString,
  };

export type ActivationData = ActivationKey & {
  userId: ObjectId,
};

export type ActivationDataAtClient =
  MongoDataOfUser &
  ActivationKeyAtClient &
  Omit<ActivationData, keyof ActivationKey | 'userId'>;

export type ActivationInfo = {
  type: 'key',
  data: ActivationKeyAtClient,
} | {
  type: 'data',
  data: ActivationDataAtClient,
};
