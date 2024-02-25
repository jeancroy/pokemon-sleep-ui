import {patreonSearchParams} from '@/handler/activation/check/patreon/api/const';
import {PatreonMemberResponse} from '@/handler/activation/check/patreon/api/member/type';
import {sendPatreonApiRequest} from '@/handler/activation/check/patreon/api/utils/request';


type GetPatreonMemberOpts = {
  userId: string,
};

export const getPatreonMember = async ({userId}: GetPatreonMemberOpts): Promise<PatreonMemberResponse> => {
  return await sendPatreonApiRequest(
    `https://www.patreon.com/api/oauth2/v2/members/${userId}?${patreonSearchParams.toString()}`,
  ) as PatreonMemberResponse;
};
