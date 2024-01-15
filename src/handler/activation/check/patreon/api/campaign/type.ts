import {PatreonMember} from '@/types/subscription/patreon/common/member';
import {PatreonResponse} from '@/types/subscription/patreon/common/response';
import {PatreonUser} from '@/types/subscription/patreon/common/user';


export type PatreonCampaignMemberResponse = PatreonResponse<PatreonMember[], PatreonUser[]> & {
  links?: {
    next: string,
  }
};
