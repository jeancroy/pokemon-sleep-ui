import {Session} from 'next-auth';

import {Nullable} from '@/utils/type';


export type FilterPremiumRestrictableProps = {
  premiumOnly: true,
  session: Nullable<Session>,
} | {
  premiumOnly?: false,
  session?: never,
};

export type UseFilterPremiumRestrictableReturn = {
  isPremium: boolean,
  isInputRestricted: boolean,
  isInputChangeRestricted: () => boolean,
};
