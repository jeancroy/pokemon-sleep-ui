import {IsoUtcTimestampString} from '@/types/date';
import {PatreonChargeStatus, PatronStatus} from '@/types/subscription/patreon/common/enum';
import {PatreonTier} from '@/types/subscription/patreon/common/tier';


// https://docs.patreon.com/#member
export type PatreonMember = {
  type: 'member',
  id: string,
  attributes: {
    email: string,
    last_charge_date: IsoUtcTimestampString | null,
    last_charge_status: PatreonChargeStatus,
    patron_status: PatronStatus,
    pledge_cadence: number, // In unit of month
  },
  relationships: {
    currently_entitled_tiers: {
      data: PatreonTier[],
    },
  },
};
