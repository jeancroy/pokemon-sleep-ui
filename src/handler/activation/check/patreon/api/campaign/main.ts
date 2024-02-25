import {zip} from 'lodash';

import {PatreonCampaignMemberResponse} from '@/handler/activation/check/patreon/api/campaign/type';
import {patreonSearchParams} from '@/handler/activation/check/patreon/api/const';
import {sendPatreonApiRequest} from '@/handler/activation/check/patreon/api/utils/request';
import {PatreonMember} from '@/types/subscription/patreon/common/member';
import {PatreonUser} from '@/types/subscription/patreon/common/user';
import {PatreonMemberData} from '@/types/subscription/patreon/memberData';
import {isNotNullish} from '@/utils/type';


export const getCurrentCampaignMembers = async (): Promise<PatreonMemberData[]> => {
  const campaign = process.env.EXTERNAL_PATREON_CAMPAIGN_ID;

  const members: PatreonMember[] = [];
  const users: PatreonUser[] = [];

  let url: string | undefined = (
    `https://www.patreon.com/api/oauth2/v2/campaigns/${campaign}/members?${patreonSearchParams.toString()}`
  );
  do {
    const {
      data,
      included,
      links,
    } = await sendPatreonApiRequest(url) as PatreonCampaignMemberResponse;

    members.push(...data);
    users.push(...included);

    url = links?.next;
  } while (!!url);

  return zip(members, users)
    .map(([member, user]) => {
      if (!member) {
        return null;
      }

      if (!user) {
        return null;
      }

      return {member, user};
    })
    .filter(isNotNullish);
};
